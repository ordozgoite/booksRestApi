const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// connect to mongodb atlas
mongoose.connect("mongodb+srv://admin-victor:Test123@cluster0.ucxvmno.mongodb.net/booksdb?retryWrites=true&w=majority", {useNewUrlParser: true}).then(() => {
    console.log("Connected to mongodb atlas.");
}).catch(error => {
    console.log("Something wrong happened", error);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});