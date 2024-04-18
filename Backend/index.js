const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.routes');

const app = express();
const DB_URI = "mongodb://127.0.0.1:27017";

// Connect to MongoDB
mongoose.connect(`${DB_URI}`)
    .then(() => console.log("Connected to DB at", DB_URI))
    .catch((e) => console.log("Failed to connect to DB", e));

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
