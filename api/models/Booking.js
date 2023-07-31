const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BookingSchema = new Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Place"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
});

const BookingModel = model("Booking", BookingSchema);

module.exports = BookingModel;