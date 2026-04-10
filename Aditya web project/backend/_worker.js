import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import outpassRoutes from './routes/outpassRoutes.js';

// Connect to Database
await connectDB();

// Export for Cloudflare Workers
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Basic routing
    if (url.pathname === '/') {
      return new Response(JSON.stringify({ message: 'Welcome to the Premium Backend API' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url.pathname.startsWith('/api/auth')) {
      return handleAuthRoutes(request, url);
    }
    
    if (url.pathname.startsWith('/api/outpass')) {
      return handleOutpassRoutes(request, url);
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
