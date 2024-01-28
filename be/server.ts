import config from './utils/config';
import app from './app';
import { connectMongoDB } from './models';

const PORT = config.serverPort;

connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
