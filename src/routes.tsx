import { Route, Routes } from "react-router-dom";
import RestaurantPage from "./pages/Restaurante";
import Home from "./pages/Home";

const Pages = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/restaurante/:id" element={<RestaurantPage />} />
  </Routes>
);

export default Pages;
