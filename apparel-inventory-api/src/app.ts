import express from 'express';
import cors from 'cors';
import path from 'path';
import apparelRoutes from './routes/apparel.routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/apparel', apparelRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// Handle frontend routes - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;