import app from './app';

import config from './utils/config';

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});