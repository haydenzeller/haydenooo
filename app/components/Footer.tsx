"use client";
import { useState, useEffect } from "react";

export default function Footer() {
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState("");

  const getLocation = async () => {
    const response = await fetch("https://geolocation-db.com/json/");
    const data = await response.json();
    setLocation(data.country_name);
  };
  const getCount = async () => {
    const response = await fetch(
      "https://abacus.jasoncameron.dev/hit/hayden.ooo/visits"
    );
    const data = await response.json();
    setCount(data.value);
  };

  useEffect(() => {
    getCount();
    getLocation();
  }, []);

  return (
    <div className="absolute bottom-0 w-full p-2 text-sm">
      <div className="flex flex-row justify-center items-center gap-0">
        <div className="flex flex-row gap-2 justify-center items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse items-center justify-center"></div>
          <div className="font-bold">
            {count} Visits - Hello stranger from{" "}
            <span className="text-red-500">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
