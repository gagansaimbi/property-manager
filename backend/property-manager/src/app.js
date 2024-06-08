const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const propertyRoutes = require('./routes/properties');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/property-manager')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

app.use(bodyParser.json());
app.use(propertyRoutes);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
