import './App.css';
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import axios from "axios";
import AuthContextProvider from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/account" element={<ProfilePage />}></Route>
          <Route path="/account/places" element={<PlacesPage />}></Route>
          <Route path="/account/places/new" element={<PlacesFormPage />}></Route>
          <Route path="/account/places/:id" element={<PlacesFormPage />}></Route>
          <Route path="/place/:id" element={<PlacePage />}></Route>
          <Route path="/account/bookings" element={<BookingsPage />}></Route>
          <Route path="/account/bookings/:id" element={<BookingPage />}></Route>
        </Route>
      </Routes>

    </AuthContextProvider>
  )
}

export default App
