import { useState } from "react";
import axios from "axios";
import api from "../utils/api";

export default function SearchBook() {
  const [query, setQuery] = useState({
    capacityKg: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });
  const [vehicles, setVehicles] = useState([]);

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        "http://localhost:5000/api/vechile/available",
        { params: query }
      );
      console.log(res)
      setVehicles(res.data.vehicles || []);
    } catch (error) {
      alert("Error fetching vehicles");
    }
  };

  const handleBook = async (vehicleId) => {
    try {
     await api.post("http://localhost:5000/api/booking/book-vehicle", {
  ...query,
  vehicleId,
  costumerId: "123",  
});

      alert("Vehicle booked ");
    } catch (error) {
      alert("Booking failed ");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 border-2 mt-12 rounded-xl shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Search & Book Vehicle</h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-3 max-w-md">
          <input
            type="number"
            name="capacityKg"
            placeholder="Required Capacity (kg)"
            value={query.capacityKg}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="fromPincode"
            placeholder="From Pincode"
            value={query.fromPincode}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="toPincode"
            placeholder="To Pincode"
            value={query.toPincode}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="datetime-local"
            name="startTime"
            value={query.startTime}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </form>

        {/* Vehicles List */}
        <div className="mt-6">
          {vehicles.length > 0 ? (
            <div>
              <h3 className="font-bold mb-2">Available Vehicles</h3>
              {vehicles.map((v) => (
                <div
                  key={v._id}
                  className="border p-3 flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="font-semibold">{v.name}</p>
                    <p>Capacity: {v.capacityKg} kg</p>
                    <p>Tyres: {v.tyres}</p>
                  </div>
                  <button
                    onClick={() => handleBook(v._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No vehicles found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
