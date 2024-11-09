const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Connect to MongoDB (Updated, without deprecated options)
mongoose.connect('mongodb://localhost:27017/transportBooking')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Create a schema for the booking
const bookingSchema = new mongoose.Schema({
  name: String,
  date: String,
  location: String,
  destination: String,
  paymentMethod: String,
});

// Create a model from the schema
const Booking = mongoose.model('Booking', bookingSchema);

// Root route to serve the HTML page (booking form)
app.get('/', (req, res) => {
  // Serve booking.html (Update this line if it's in 'views' or 'public')
  res.sendFile(__dirname + '/public/Booking.html');  // Use '/public/booking.html' if it's in the public folder
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, date, location, destination } = req.body;
  const paymentMethod = req.body.paymentMethod || 'Not Selected';

  // Save the booking to the database
  const newBooking = new Booking({
    name,
    date,
    location,
    destination,
    paymentMethod
  });

  newBooking.save()
    .then(() => {
      res.send('Booking confirmed!');
    })
    .catch((err) => {
      res.status(500).send('Error occurred while saving the booking: ' + err);
    });
});

// Start the server
const port = 3190;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
