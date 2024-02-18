import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useAppContext } from "../context/AppContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  const { currentCity, deleteCity } = useAppContext();

  function handleClick(e) {
    e.preventDefault();

    deleteCity(id);
  }

  return (
    <li className={currentCity.id === id ? styles["cityItem--active"] : ""}>
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
