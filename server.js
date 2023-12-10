const app = require('./app.js');

const port = 8888;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
