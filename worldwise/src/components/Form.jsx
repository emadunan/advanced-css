// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlLocation } from "../hooks/useUrlLocation";
import Spinner from "./Spinner";
import Message from "./Message";

import ar from "date-fns/locale/ar";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

registerLocale("ar", ar);

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
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [emoji, setEmoji] = useState(null);
  const [lat, lng] = useUrlLocation();
  const { createCity, isLoading } = useAppContext();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);

    navigate("/app");
  }

  useEffect(() => {
    if (!lat || !lng) return;

    setIsLoadingForm(true);

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
      .finally(() => setIsLoadingForm(false));
  }, [lng, lat]);

  if (isLoadingForm) return <Spinner />;

  if (error) return <Message message={error.message} />;

  if (!lat || !lng)
    return <Message message={"Neither latitude nor longitude was selected"} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
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
        <DatePicker
          id="date"
          selected={date}
          onSelect={() => {}} //when day is clicked
          onChange={(date) => setDate(date)} //only when value has changed
          dateFormat="dd/MM/yyyy"
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
