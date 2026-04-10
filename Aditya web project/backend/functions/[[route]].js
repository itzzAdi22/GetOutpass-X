// Cloudflare Pages function for Express.js
import { connectDB } from '../../config/db.js';

export async function onRequest(context) {
  const { request, env, params } = context;
  
  // Set environment variables
  process.env.MONGO_URI = env.MONGO_URI;
  process.env.JWT_SECRET = env.JWT_SECRET;
  
  // Connect to database
  await connectDB();
  
  // Import and use Express app
  const { default: app } = await import('../../server.js');
  
  return app(request);
}
