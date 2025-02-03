const express = require('express');
const app = express();
const path = require('path');
const env = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');  // For logging HTTP requests
const connectDb = require('./connectDb'); // importing connectDb function

env.config({ path: 'config.env' });

const userRouter = require('./routes/userRouter');
connectDb(); // For connection of Database

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // Log HTTP requests

// Route for API
app.use('/api/v1/', userRouter);

// Home route for rendering views
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to myapp' });
});

// Global error handler (for unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
