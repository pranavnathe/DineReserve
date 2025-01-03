import { Router } from "express";
import {
    createBooking,
    getBookingsByMobile,
    getAvailableSlots,
    deleteBooking,
    getBookingById,
} from "../controllers/booking.controller.js";

const router = Router();

// Create a new booking
router.route("/").post(createBooking);

// Get bookings by mobile number
router.route("/mobile/:mobile").get(getBookingsByMobile);

// Get available time slots for a restaurant
router.route("/slots").post(getAvailableSlots);

// Route to get a booking by ID
router.get("/:bookingId", getBookingById);

// Delete a booking
router.route("/:bookingId").delete(deleteBooking);

export default router;
