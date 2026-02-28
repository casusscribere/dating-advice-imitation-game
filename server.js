// This is the entry point for the backend server.

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Dating Advice Imitation Game Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});