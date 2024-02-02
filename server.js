require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT||3000;
mongoose.connect(process.env.DB_CONN);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
const LocationRoutes=require('./Routes/LocationRoutes');
const UserRoutes=require('./Routes/UserRoutes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(UserRoutes);
app.use(LocationRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







