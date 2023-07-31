import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const BookingWidget = ({ place }) => {

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    let numberOfNights = 0;
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, []);

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    const bookThisPlace = async () => {
        const bookingData = {
            name,
            phone,
            checkIn,
            checkOut,
            place: place._id,
            numberOfGuests,
            price: numberOfNights * place.price,
        };

        const { data } = await axios.post("/bookings", bookingData);
        navigate(`/account/bookings/${data._id}`);
    }

    return (
        <>
            <div className="bg-white p-4 rounded-2xl shadow">
                <div className="text-2xl text-center">
                    Price: ${place.price} / per night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className="py-3 px-4">
                            <label>Check in:</label>
                            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label>Check out:</label>
                            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div className="py-3 px-4 border-t">
                            <label>Number of guests:</label>
                            <input type="number" value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} />
                        </div>
                    </div>
                    {numberOfNights > 0 && (
                        <div className="py-3 px-4 border-t">
                            <label>Your full name:</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />
                            <label>Phone number:</label>
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                    )}
                </div>
                <button onClick={bookThisPlace} className="primary mt-4">
                    Book this place
                    {numberOfNights > 0 && (
                        <>
                            <span> ${numberOfNights * place.price}</span>
                        </>
                    )}
                </button>
            </div>
        </>
    )
}

export default BookingWidget