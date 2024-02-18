import React, { useEffect, useState } from "react";
import { usePartOfDay } from "./context/PartOfDayContext";

function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export default function Timer() {
  const [time, setTime] = useState(formatTime(new Date()));

  // Will be be AM or PM
  const partOfDay = time.slice(-2);
  const { setPartOfDay } = usePartOfDay();

  useEffect(() => {
    setPartOfDay(partOfDay);
  }, [partOfDay, setPartOfDay]);

  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <time>For your workout on {time}</time>;
}
