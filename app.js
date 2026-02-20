const express = require("express");

const app = express();

app.use(express.json());

const enrollmentRoutes = require("./routes/enrollmentRoutes");

// routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/courses", require("./routes/courseRoutes"));

app.use("/api/enroll", enrollmentRoutes);

// tests the route
app.get("/" , (req, res) => {
    res.json({
        message: "Student Course API running"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Server Error"
  });
});

app.use("/api/test", require("./routes/testRoutes"));

app.get("/check/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});


module.exports = app;