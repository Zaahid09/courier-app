import React, { useState } from "react";
import axios from "axios";

const CreateShipment = () => {
  const [form, setForm] = useState({
    recipient_name: "",
    recipient_address: "",
    recipient_phone: "",
    package_type: "",
    weight_kg: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/shipments", form);

      setMessage(
        "Shipment Created! Tracking: " + res.data.shipment.tracking_number,
      );

      // clear form
      setForm({
        recipient_name: "",
        recipient_address: "",
        recipient_phone: "",
        package_type: "",
        weight_kg: "",
      });
    } catch (err) {
      setMessage("Error creating shipment");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Create Shipment</h2>

        {message && <p className="mb-4 text-blue-600">{message}</p>}

        <input
          placeholder="Recipient Name"
          className="border p-2 w-full mb-3"
          value={form.recipient_name}
          onChange={(e) => setForm({ ...form, recipient_name: e.target.value })}
        />

        <input
          placeholder="Recipient Address"
          className="border p-2 w-full mb-3"
          value={form.recipient_address}
          onChange={(e) =>
            setForm({ ...form, recipient_address: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full mb-3"
          value={form.recipient_phone}
          onChange={(e) =>
            setForm({ ...form, recipient_phone: e.target.value })
          }
        />

        <input
          placeholder="Package Type"
          className="border p-2 w-full mb-3"
          value={form.package_type}
          onChange={(e) => setForm({ ...form, package_type: e.target.value })}
        />

        <input
          placeholder="Weight (kg)"
          className="border p-2 w-full mb-3"
          value={form.weight_kg}
          onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
        />

        <button className="bg-blue-500 text-white p-2 w-full">
          Create Shipment
        </button>
      </form>
    </div>
  );
};

export default CreateShipment;
