"use client"
import { useState, useEffect } from "react";

export default function Footer() {
  const [count, setCount] = useState(0);

  const getCount = async () => {
    const response = await fetch(
      "https://abacus.jasoncameron.dev/hit/hayden.ooo/visits"
    );
    const data = await response.json();
    setCount(data.value);
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="absolute bottom-0 w-full p-5">
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <div className="font-bold">{count} Visitors</div>
      </div>
    </div>
  );
}
