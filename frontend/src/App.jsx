
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddVehicle from "./pages/AddVehicle";
import SearchBook from "./pages/SearchBook";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddVehicle />} />
        <Route path="/search-book" element={<SearchBook />} />
        <Route path="/bookings" element={<Bookings />} />

      </Routes>
    </Router>
  );
}

export default App;
