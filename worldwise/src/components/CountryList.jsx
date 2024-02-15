import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Country from "./CountryItem";
import Message from "./Message";
import { useAppContext } from "../context";

function CountryList() {
  const { cities, isLoading } = useAppContext();

  if (isLoading) return <Spinner />;

  if (cities.length < 1)
    return <Message message="Add your first Country by clicking on the map" />;

  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }];
    } else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <Country country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
