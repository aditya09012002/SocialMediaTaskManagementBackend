import mongoose from 'mongoose';
import { CloudinaryService } from '../storage/Cloudinary.service';
import { createResponse } from '../types/GenericReponse';
import { TaskSubmissionModel } from './models/TaskSubmission.model';
import fs from 'fs/promises';
import { WebsocketService } from '../common/WebSocket.service';

export class TaskService {
  private cloudinaryService: CloudinaryService;
  private websocketService: WebsocketService;
  constructor() {
    this.cloudinaryService = new CloudinaryService();
    this.websocketService = new WebsocketService();
  }

  SubmitTask = async (
    name: string,
    socialMediaHandle: string,
    imagePaths: string[],
    userId: string,
  ) => {
    let uploadedImages: { id: string; url: string }[] = [];

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const uploadedResults = await this.cloudinaryService.uploadMultipleImages(
        imagePaths,
        'task_submissions',
      );

      uploadedImages = uploadedResults.map((image) => ({
        id: image.asset_id,
        url: image.secure_url,
      }));

      const task = await TaskSubmissionModel.create(
        [
          {
            name,
            socialMediaHandle,
            images: uploadedImages.map((img) => ({ url: img.url })),
            userId,
          },
        ],
        {
          session,
        },
      );

      await session.commitTransaction();

      this.websocketService.broadcast({
        event: 'task_submission',
        data: { task },
      });

      return createResponse(false, 201, 'Task Created successfully', task);
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      if (uploadedImages.length > 0) {
        for (const image of uploadedImages) {
          try {
            await this.cloudinaryService.deleteImage(image.url);
          } catch (deleteError) {
            console.error('Error deleting image from Cloudinary:', deleteError);
          }
        }
      }

      return createResponse(
        true,
        500,
        'Error registering task',
        error instanceof Error ? error.message : error,
      );
    } finally {
      session.endSession();
      await Promise.all(
        imagePaths.map((filePath) => fs.unlink(filePath).catch(() => {})),
      );
    }
  };

  GetTasks = async (page: number = 1, limit: number = 1) => {
    try {
      const skip = (page - 1) * limit;
      const tasks = await TaskSubmissionModel.find()
        .skip(skip)
        .limit(limit)
        .lean();
      const totalTasks = await TaskSubmissionModel.countDocuments();
      return createResponse(false, 200, 'Tasks fetched successfully', {
        tasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: page,
        totalItems: totalTasks,
      });
    } catch (error) {
      console.log(error);
      return createResponse(
        true,
        500,
        'Error fetching tasks',
        error instanceof Error ? error.message : error,
      );
    }
  };

  GetTasksByUserId = async (userId: string, page: number, limit: number) => {
    try {
      const skip = (page - 1) * limit;

      const tasks = await TaskSubmissionModel.find({
        userId,
      })
        .skip(skip)
        .limit(limit)
        .lean();

      const totalTasks = await TaskSubmissionModel.countDocuments({
        userId,
      });

      return createResponse(false, 200, 'Tasks fetched successfully for user', {
        tasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: page,
        totalItems: totalTasks,
      });
    } catch (error) {
      console.log(error);
      return createResponse(
        true,
        500,
        'Error fetching tasks for user',
        error instanceof Error ? error.message : error,
      );
    }
  };
}
