const express = require('express'); // Import Express
const app = express();             // Create an Express application
const PORT = 8080;                 // Define the port to listen on

// Middleware to parse JSON body in POST requests
app.use(express.json());

// Route for handling GET requests to '/shirt'
app.get('/shirt', (req, res) => {
    res.status(200).send({
        shirt: 'red',
        size: 'large',
    });
});

// Route for handling POST requests to '/shirt/:id'
app.post('/shirt/:id', (req, res) => {
    const { id } = req.params;      // Extract 'id' from URL parameters
    const { logo } = req.body;     // Extract 'logo' from the request body

    if (!logo) {
        return res.status(418).send({ message: 'We need a logo!' }); // Error if 'logo' is missing
    }

    // Success response
    res.send({
        shirt: `shirt with your ${logo} and ID of ${id}`,
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
