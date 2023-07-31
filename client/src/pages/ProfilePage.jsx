import React from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const AccountPage = () => {

    const { user, ready, setUser } = useAuth();
    let { subpage } = useParams();
    const navigate = useNavigate();

    if (subpage === undefined) {
        subpage = "profile";
    }

    if (!ready) {
        return "Loading...";
    }

    if (ready && !user) {
        return <Navigate to="/login" />
    }

    const logoutUser = async () => {
        const { data } = await axios.post("/logout");
        if (data === true) {
            setUser(null);
            navigate("/");
        }
    }

    return (
        <div>
            <AccountNav />
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logoutUser} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === "places" && (
                <PlacesPage />
            )}
        </div>
    )
}

export default AccountPage