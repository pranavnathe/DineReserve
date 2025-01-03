import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
    {
        restaurantId: {
            type: Number,
            required: true,
        },
        restaurantName: {
            type: String,
            required: true,
        },
        customer: {
            name: {
                type: String,
                required: true,
            },
            mobile: {
                type: String,
                required: true,
                match: /^\d{10}$/,
            },
            email: {
                type: String,
                required: true,
                match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            },
        },
        bookingDetails: {
            date: {
                type: String,
                required: true,
            },
            timeSlot: {
                type: String,
                required: true,
            },
            guests: {
                type: Number,
                required: true,
                min: 1,
                max: 8,
            },
        },
    },
    {
        timestamps: true,
    }
);

export const Booking = mongoose.model("Booking", bookingSchema);
