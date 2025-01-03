import { Router } from "express";
import {
    createBooking,
    getBookingsByMobile,
    getAvailableSlots,
    deleteBooking,
} from "../controllers/booking.controller.js";

const router = Router();

// Create a new booking
router.route("/").post(createBooking);

// Get bookings by mobile number
router.route("/mobile/:mobile").get(getBookingsByMobile);

// Get available time slots for a restaurant
router.route("/slots").post(getAvailableSlots);

// Delete a booking
router.route("/:bookingId").delete(deleteBooking);

export default router;
