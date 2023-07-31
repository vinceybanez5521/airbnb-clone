import React from 'react'

const PlaceImg = ({ place, index = 0, className }) => {

    if (!place.photos?.length) {
        return "";
    }

    if (!className) {
        className = "object-cover";
    }

    return (
        <>
            {place.photos.length > 0 && (
                <img className={className} src={`http://localhost:5000/uploads/${place.photos[index]}`} alt="" />
            )}
        </>
    )
}

export default PlaceImg