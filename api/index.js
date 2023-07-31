require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const upload = require("./middlewares/upload");
const fs = require("fs");

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to the database"));

app.get("/test", (req, res) => {
    res.json("test ok");
});

// User Endpoints
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });

        res.status(200).json(userDoc);
    } catch (error) {
        res.status(422).json(error);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email });

        if (!userDoc) {
            return res.status(400).json("Invalid Credentials!");
        }

        const passwordOk = await bcrypt.compareSync(password, userDoc.password);

        if (!passwordOk) {
            return res.status(400).json("Invalid Credentials!");
        }

        jwt.sign({ email, id: userDoc._id }, process.env.AUTH_TOKEN_SECRET, {}, (err, token) => {
            if (err) return res.status(400).json("Invalid Credentials!");

            res.status(200).cookie("token", token).json(userDoc);
        });
    } catch (error) {
        res.status(422).json(error);
    }
});

app.get("/profile", async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.AUTH_TOKEN_SECRET, {}, async (err, user) => {
            if (err) return res.status(403).json("Unauthorized");

            const { name, email, _id } = await User.findById(user.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post("/logout", (req, res) => {
    res.cookie("token", "").json(true);
});

// Place Endpoints
app.post("/upload-by-link", async (req, res) => {
    const { link } = req.body;

    const newName = "photo" + Date.now() + ".jpg";

    const options = {
        url: link,
        dest: __dirname + "/uploads/" + newName,
    };

    await imageDownloader.image(options);
    res.json(newName);
});

app.post("/upload", upload.array("photos", 10), async (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace("uploads\\", ""));
    }
    res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
    const { token } = req.cookies;

    const {
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
    } = req.body;

    try {
        jwt.verify(token, process.env.AUTH_TOKEN_SECRET, {}, async (err, user) => {
            if (err) return res.status(403).json(err);

            const placeDoc = await Place.create({
                owner: user.id,
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price
            });

            res.json(placeDoc);
        });
    } catch (error) {
        res.status(422).json(error);
    }
});

app.get("/places", async (req, res) => {
    const placeDocs = await Place.find();
    res.json(placeDocs);
});

app.get("/user-places", async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, process.env.AUTH_TOKEN_SECRET, {}, async (err, user) => {
        if (err) return res.status(403).json(err);

        const placeDocs = await Place.find({ owner: user.id });
        res.json(placeDocs);
    });
});

app.get("/places/:id", async (req, res) => {
    const { id } = req.params;

    const placeDoc = await Place.findById(id);
    res.json(placeDoc);
});

app.put("/places", async (req, res) => {
    const { token } = req.cookies;
    const {
        id,
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
    } = req.body;

    try {
        jwt.verify(token, process.env.AUTH_TOKEN_SECRET, {}, async (err, user) => {
            if (err) return res.status(403).json(err);

            const placeDoc = await Place.findById(id);

            if (user.id === placeDoc.owner.toString()) {
                placeDoc.set({
                    title,
                    address,
                    photos: addedPhotos,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price
                });
                await placeDoc.save();
                res.json(placeDoc);
            }
        });
    } catch (error) {
        res.status(422).json(error);
    }
});

/* Bookings endpoint */
app.post("/bookings", async (req, res) => {
    const { token } = req.cookies;

    const {
        name,
        phone,
        checkIn,
        checkOut,
        place,
        numberOfGuests,
        price
    } = req.body;

    try {
        jwt.verify(token, process.env.AUTH_TOKEN_SECRET, {}, async (err, user) => {
            if (err) return res.status(403).json(err);

            const bookingDoc = await Booking.create({
                name,
                phone,
                checkIn,
                checkOut,
                place,
                numberOfGuests,
                price,
                user: user.id
            });

            res.status(200).json(bookingDoc);
        });
    } catch (error) {
        res.status(422).json(error);
    }
});

app.get("/bookings", async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, process.env.AUTH_TOKEN_SECRET, {}, async (err, user) => {
        if (err) return res.status(403).json(err);

        const bookingsDoc = await Booking.find({ user: user.id }).populate("place");
        res.json(bookingsDoc);
    });
});

app.listen(process.env.PORT, () => console.log(`Server started in PORT ${process.env.PORT}`));