import { Booking } from "../models/booking.model.js";

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { restaurantId, restaurantName, customer, bookingDetails } =
            req.body;

        // Check if the time slot is already booked
        const existingBooking = await Booking.findOne({
            "bookingDetails.date": bookingDetails.date,
            "bookingDetails.timeSlot": bookingDetails.timeSlot,
            restaurantId,
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "This time slot is already booked.",
            });
        }

        // Create and save the booking
        const booking = new Booking({
            restaurantId,
            restaurantName,
            customer: {
                name: customer.name,
                mobile: customer.mobile,
                email: customer.email,
            },
            bookingDetails,
        });

        await booking.save();

        return res.status(201).json({
            success: true,
            message: "Booking created successfully!",
            booking,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating booking.",
            error: error.message,
        });
    }
};

// Get bookings by mobile number
const getBookingsByMobile = async (req, res) => {
    try {
        const { mobile } = req.params;

        const bookings = await Booking.find({ "customer.mobile": mobile });

        if (!bookings.length) {
            return res.status(404).json({
                success: false,
                message: "No bookings found for the given mobile number.",
            });
        }

        return res.status(200).json({
            success: true,
            bookings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving bookings.",
            error: error.message,
        });
    }
};

// Controller to get a booking by ID
export const getBookingById = async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Find the booking by its ID
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found.",
            });
        }

        return res.status(200).json({
            success: true,
            booking,
        });
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the booking.",
        });
    }
};

// Get available time slots for a restaurant
const getAvailableSlots = async (req, res) => {
    try {
        const { restaurantId, date } = req.body;

        const allSlots = [
            "7:00 PM",
            "7:30 PM",
            "8:00 PM",
            "8:30 PM",
            "9:00 PM",
            "9:30 PM",
            "10:00 PM",
        ];

        const bookedSlots = await Booking.find({
            restaurantId,
            "bookingDetails.date": date,
        }).select("bookingDetails.timeSlot -_id");

        const unavailableSlots = bookedSlots.map(
            (b) => b.bookingDetails.timeSlot
        );

        const availableSlots = allSlots.filter(
            (slot) => !unavailableSlots.includes(slot)
        );

        return res.status(200).json({
            success: true,
            availableSlots,
            unavailableSlots,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving available slots.",
            error: error.message,
        });
    }
};

// Delete a booking
const deleteBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully.",
            deletedBooking,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting booking.",
            error: error.message,
        });
    }
};

export { createBooking, getBookingsByMobile, getAvailableSlots, deleteBooking };
