require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// обработка ошибок, последний Middleware
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('API is working');
});



const start = async () => {
    console.log('Starting server...');
    try {
      console.log('Attempting to authenticate database...');
      await sequelize.authenticate();
      console.log('Database authenticated');
      await sequelize.sync();
      console.log('Database synchronized');
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
      console.log('Error during database connection or server startup:', e);
    }
};

start();
  