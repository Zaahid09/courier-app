import { useState } from "react";
import axios from "axios";

export default function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!trackingNumber.trim()) {
      setError("Enter a tracking number");
      return;
    }

    try {
      const res = await axios.get(
        `/api/shipments/track/${trackingNumber.trim()}`,
      );
      setResult(res.data.tracking);
    } catch (err) {
      setError(err?.response?.data?.message || "Tracking failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Track Shipment</h2>

        <form onSubmit={handleTrack} className="flex gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="TRK-123..."
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 rounded">Track</button>
        </form>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {result && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <p>
              <b>Tracking:</b>{" "}
              <span className="font-mono">{result.tracking_number}</span>
            </p>
            <p>
              <b>Status:</b> {result.current_status}
            </p>
            <p className="text-sm text-gray-600">
              <b>Created:</b> {new Date(result.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
