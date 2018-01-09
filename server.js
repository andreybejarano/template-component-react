const express = require('express');
const app = express();
let env = process.env.NODE_ENV || 'development';
const config = {
  port: 3000,
  env: env
};

app.use('/sandbox', express.static('sandbox'));

app.use('/dist', express.static('dist'));

app.disable('x-powered-by');

app.listen(config.port, () => {
  console.log(`server started on port ${config.port} (${config.env})`);
});
