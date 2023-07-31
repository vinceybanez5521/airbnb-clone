import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

const BookingPage = () => {

    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            const getBooking = async () => {
                const { data } = await axios.get("/bookings");
                const selectedBooking = data.find(({ _id }) => _id === id);
                setBooking(selectedBooking);
            };

            getBooking();
        } else {

        }
    }, []);

    if (!booking) {
        return "";
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block">
                {booking.place.address}
            </AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information</h2>
                    <BookingDates booking={booking}></BookingDates>
                </div>
                <div className="bg-primary text-white rounded-2xl p-6">
                    <div>Total price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place}></PlaceGallery>
        </div>
    )
}

export default BookingPage