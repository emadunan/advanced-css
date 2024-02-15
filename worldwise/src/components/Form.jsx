// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlLocation } from "../hooks/useUrlLocation";
import { useAppContext } from "../context";
import Spinner from "./Spinner";
import Message from "./Message";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emoji, setEmoji] = useState(null);

  const [lat, lng] = useUrlLocation();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
      .then((response) => response.json())
      .then((data) => {
        const { city, locality, countryName, countryCode } = data;

        if (!countryName) throw new Error("Select a place within a country");

        setCityName(city || locality || "");
        setCountry(countryName);
        setEmoji(convertToEmoji(countryCode));
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [lng, lat]);

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error.message} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}} type="primary">
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
