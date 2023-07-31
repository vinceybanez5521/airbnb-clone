import React, { useEffect, useState } from 'react'
import AccountNav from "../components/AccountNav"
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { format, differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";

const BookingsPage = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            const { data } = await axios.get("/bookings");
            setBookings(data);
        };

        getBookings();
    }, []);

    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} key={booking._id} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-48">
                            <PlaceImg place={booking.place}></PlaceImg>
                        </div>
                        <div className="py-3 grow pr-3 mt-2 py-2">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <div className="text-xl">
                                <div className="flex gap-1 items-center mb-2 mt-2 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                    </svg>
                                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights:
                                    <div className="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                        </svg>
                                        {format(new Date(booking.checkIn), "yyyy-MM-dd")}
                                    </div>
                                    &rarr;
                                    <div className="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-2xl">
                                            {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    Total price: ${booking.price}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage