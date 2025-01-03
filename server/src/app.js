import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: true, // process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// comman middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import bookingRouter from "./routes/booking.routes.js";

// routes
app.use("/api/healthcheck", healthcheckRouter);
app.use("/api/booking", bookingRouter);

export { app };
