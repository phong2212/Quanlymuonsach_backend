const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const booksRouter = require("./app/routes/book.route");
const nxbRouter = require("./app/routes/nxb.route");
const staffRouter = require("./app/routes/staff.route");
const guestRouter = require("./app/routes/guest.route");
const borrowRouter = require("./app/routes/borrow.route");





const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to borrow book application." })
});

app.use("/api/books", booksRouter);

app.use("/api/nxb", nxbRouter);

app.use("/api/staff", staffRouter);

app.use("/api/guest", guestRouter);

app.use("/api/borrow", borrowRouter);





app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;