import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import AccountNav from "../components/AccountNav"
import axios from "axios";

const PlacesPage = () => {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const getPlaces = async () => {
            const { data } = await axios.get("/user-places");
            setPlaces(data);
        };

        getPlaces();
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link to="/account/places/new" className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                {places.length > 0 && places.map(place => (
                    <Link key={place._id} to={`/account/places/${place._id}`}>
                        <div className="flex gap-4 bg-gray-200 p-4 rounded-2xl cursor-pointer">
                            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                                {place.photos.length > 0 && (
                                    <img className="object-cover" src={`http://localhost:5000/uploads/${place.photos[0]}`} alt="" />
                                )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <p className="text-sm mt-2">{place.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PlacesPage