import { Route, Routes } from "react-router-dom";
import Profiles from "./pages/Profiles";
import Home from "./pages/Home";

const Pages = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/profiles" element={<Profiles />} />
  </Routes>
);

export default Pages;
