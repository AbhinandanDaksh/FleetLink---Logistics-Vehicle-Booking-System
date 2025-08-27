import { useEffect, useState } from "react";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/booking/my-bookings", {
          params: { costumerId: "123" }, 
        });
        console.log(res)
        setBookings(res.data.bookings);
      } catch (error) {
        alert("Error fetching bookings ❌");
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 border-2 mt-2 shadow-2xl rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id} className="border p-3 mb-2 rounded">
              <p>
                <strong>Vehicle:</strong> {b.vehicleId?.name}
              </p>
              <p>
                <strong>From:</strong> {b.fromPincode} → <strong>To:</strong>{" "}
                {b.toPincode}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(b.startTime).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
