import { Request, Response } from 'express';
import { createResponse } from '../types/GenericReponse';
import { TaskService } from './Task.service';
import { WebsocketService } from '../common/WebSocket.service';

class TaskController {
  private taskService: TaskService;
  constructor() {
    this.taskService = new TaskService();
  }
  public SubmitTaskController = async (req: Request, res: Response) => {
    const { name, socialMediaHandle } = req.body;
    const userId = req.user?.id;
    if (!name || !socialMediaHandle || !req.files) {
      res
        .status(400)
        .json(createResponse(true, 400, 'Missing required fields or files'));
      return;
    }
    const files = Array.isArray(req.files) ? req.files : [];
    const filePaths = files.map((file) => file.path);
    const result = await this.taskService.SubmitTask(
      name,
      socialMediaHandle,
      filePaths,
      userId,
    );
    res.status(result.status).json(result);
  };

  public GetAllTaskController = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const response = await this.taskService.GetTasks(
      parseInt(page as string),
      parseInt(limit as string),
    );

    res.status(response.status).json(response);
  };

  public GetUserTasks = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user?.id;
    const response = await this.taskService.GetTasksByUserId(
      userId,
      parseInt(page as string),
      parseInt(limit as string),
    );
    res.status(response.status).json(response);
  };
}

const TaskControllerInstance = new TaskController();
export default TaskControllerInstance;
