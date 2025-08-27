// import { useState } from "react";
// // import api from "../utils/api";
// import axios from "axios";

// export default function AddVehicle() {
//   const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("dfgdh")
//       const response=await axios.post("http://localhost:5000/api/vechile/add-vechile", form);
//       console.log("dfgdh",response)
//       setForm({ name: "", capacityKg: "", tyres: "" });
//     } catch (error) {
//       alert("Error adding vehicle ❌");
//     }
//   };

//   return (
//     <div className=" flex justify-center items-center">
//          <div className="p-6 border-2 mt-12 rounded-xl shadow-2xl  ">
//       <h2 className="text-xl font-bold mb-4">Add Vehicle</h2>
//       <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
//         <input
//           type="text"
//           name="name"
//           placeholder="Vehicle Name"
//           value={form.name}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           name="capacityKg"
//           placeholder="Capacity (kg)"
//           value={form.capacityKg}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           name="tyres"
//           placeholder="No. of Tyres"
//           value={form.tyres}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Add Vehicle
//         </button>
//       </form>
//     </div>

//     </div>
   
//   );
// }
import { useState } from "react";
import axios from "axios";

export default function AddVehicle() {
  const [form, setForm] = useState({ 
    name: "", 
    capacityKg: "", 
    tyres: "", 
    fromPincode: "", 
    toPincode: "" 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/vechile/add-vechile", 
        form
      );
      console.log("Vehicle Added ✅", response.data);
      alert("Vehicle added successfully 🚚");
      setForm({ name: "", capacityKg: "", tyres: "", fromPincode: "", toPincode: "" });
    } catch (error) {
      console.error(error);
      alert("Error adding vehicle ❌");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 border-2 mt-12 rounded-xl shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Add Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
          
          <input
            type="text"
            name="name"
            placeholder="Vehicle Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="capacityKg"
            placeholder="Capacity (kg)"
            value={form.capacityKg}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="tyres"
            placeholder="No. of Tyres"
            value={form.tyres}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="fromPincode"
            placeholder="From Pincode"
            value={form.fromPincode}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="toPincode"
            placeholder="To Pincode"
            value={form.toPincode}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}
