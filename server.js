require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error){
        console.log("Failed to start server:", error);
    }
};

// Add this temporarily to see which middleware is causing the issue
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  console.error('Stack:', error.stack);
});

startServer();