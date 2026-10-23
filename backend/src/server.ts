import app from './app';
import { testConnection } from './config/database';
import config from './config/env';

const startServer = async (): Promise<void> => {
  await testConnection();

  app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
    console.log(`📡 API available at http://localhost:${config.port}/api`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
