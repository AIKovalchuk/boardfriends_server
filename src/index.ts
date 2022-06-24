import express from "express";

const app = express();

const port = 8080;

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});
