import React, { useEffect, useState } from "react";
import axios from "axios";

const MyShipments = ({ user }) => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const url =
          user?.role === "admin"
            ? "/api/shipments" // admin gets ALL shipments
            : "/api/shipments/my"; // normal user gets own

        const res = await axios.get(url);

        // admin route returns rows directly
        // user route returns { shipments: [...] }
        setShipments(res.data.shipments || res.data);
      } catch (err) {
        console.log("Failed to load shipments");
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        Loading shipments...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {user?.role === "admin" ? "All Shipments (Admin)" : "My Shipments"}
      </h2>

      {shipments.length === 0 ? (
        <p>No shipments found.</p>
      ) : (
        <table className="w-full bg-white shadow rounded text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-center">Tracking</th>
              <th className="p-4 text-center">Recipient</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Created</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.tracking_number}</td>
                <td className="p-3">{s.recipient_name}</td>
                <td className="p-3">{s.current_status}</td>
                <td className="p-3">
                  {new Date(s.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyShipments;
