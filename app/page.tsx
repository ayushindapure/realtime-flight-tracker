"use client";

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

export default function Home() {
  const [flightIata, setFlightIata] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFlightData = async () => {
    setLoading(true);
    // setError(null);
    try {
      const response = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=0589891dd972e89180fc3b8295a45132&flight_iata=${flightIata}`
      );
      const data = await response.json();
      if (data && data.data) {
        setFlightData(data.data);
      } else {
        setFlightData(null);
        Error("No flight data found");
      }
    } catch (err) {
      Error("Failed to fetch flight data");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-900 text-neutral-100 p-10">
      <h1 className="text-2xl font-bold mb-4">Flight Tracker</h1>
      <input
        type="text"
        placeholder="Enter Flight IATA (e.g., QTR826)"
        value={flightIata}
        onChange={(e) => setFlightIata(e.target.value)}
        className="px-4 py-2 text-black rounded-md mb-4"
      />
      <button
        onClick={fetchFlightData}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Search Flight
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {flightData && (
        <div className="mt-6 bg-neutral-800 p-6 rounded-md w-full max-w-md">
          <h2 className="text-xl font-semibold">Flight Details</h2>
          <ul className="mt-2">
            {flightData.map((flight: { flight: { iata: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; airline: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; flight_status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; departure: { airport: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; scheduled: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; arrival: { airport: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; scheduled: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; }, index: Key | null | undefined) => (
              <li key={index} className="border-b py-2">
                <p><strong>Flight:</strong> {flight.flight.iata}</p>
                <p><strong>Airline:</strong> {flight.airline.name}</p>
                <p><strong>Status:</strong> {flight.flight_status}</p>
                <p><strong>Departure:</strong> {flight.departure.airport} at {flight.departure.scheduled}</p>
                <p><strong>Arrival:</strong> {flight.arrival.airport} at {flight.arrival.scheduled}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
