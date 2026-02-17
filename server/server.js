const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads folder if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection (MongoDB)
// Note: Make sure MongoDB is running locally or you have an Atlas URI
mongoose.connect('mongodb://localhost:27017/website-builder')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes Placeholders
app.get('/', (req, res) => {
    res.send('Website Builder API is running...');
});

// Import Routes
 const projectRoutes = require('./routes/projects');
 app.use('/api/projects', projectRoutes);
 const templateRoutes = require('./routes/templates');
 app.use('/api/templates', templateRoutes);
 const uploadRoutes = require('./routes/upload');
 app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});