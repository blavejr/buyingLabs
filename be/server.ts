import config from './utils/config';
import app from './app';

const PORT = config.serverPort;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
