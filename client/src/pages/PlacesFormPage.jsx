import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";

const PlacesFormPage = () => {

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState("");
    const [price, setPrice] = useState(100);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }

        const getPlace = async () => {
            const { data } = await axios.get("/places/" + id);
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        };

        getPlace();
    }, [id]);

    /* const addNewPlace = async (e) => {
        e.preventDefault();

        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests
        };

        const { data } = await axios.post("/places", placeData);
        navigate("/account/places");
    }; */

    const savePlace = async (e) => {
        e.preventDefault();

        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        };

        if (id) {
            // update
            const { data } = await axios.put("/places", {
                id,
                ...placeData
            });
        } else {
            // add new place
            const { data } = await axios.post("/places", placeData);
        }

        navigate("/account/places");
    };

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">Title for your place. should be short and catchy as in advertisement</p>
                <input type="text" placeholder="title, for example: My lovely apt" value={title} onChange={e => setTitle(e.target.value)} />

                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address to this place</p>
                <input type="text" placeholder="address" value={address} onChange={e => setAddress(e.target.value)} />

                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">more = better</p>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">description of the place</p>
                <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>

                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm">select all the perks of your place</p>
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">house rules, etc</p>
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)}></textarea>
                <h2 className="text-2xl mt-4">Check in & out times</h2>
                <p className="text-gray-500 text-sm">add check in and out times, remember to have some time window for cleaning the room between guests</p>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" placeholder="14" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" placeholder="11" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage