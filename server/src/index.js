import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./database/index.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 3050;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
            );
        });
    })
    .catch((error) => {
        console.log(`MonogDB Connection Error`, error);
    });
