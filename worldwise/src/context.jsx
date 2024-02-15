import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function getCity(id) {
    setIsLoading(true);

    fetch(BASE_URL + "/cities/" + id)
      .then((response) => response.json())
      .then((data) => setCurrentCity(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsLoading(true);

    fetch(BASE_URL + "/cities")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [setCities]);

  return (
    <AppContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("Context can't be called out of its provider scope");

  return context;
}

export { AppContextProvider, useAppContext };
