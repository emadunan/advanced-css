import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import City from "./CityItem";
import Message from "./Message";
import { useAppContext } from "../context";

function CityList() {
  const { cities, isLoading } = useAppContext();
  if (isLoading) return <Spinner />;

  if (cities.length < 1)
    return <Message message="Add your first city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <City city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
