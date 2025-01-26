import dotenv from 'dotenv';
dotenv.config();
const config = {
  wsPort: process.env.WS_PORT || 8080,
  port: process.env.PORT || 3000,
  cloudinayCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryAllowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
};
export default config;
