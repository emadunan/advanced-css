import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

const AppContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };

    case "rejected":
      return { ...state, isLoading: false, error: payload };

    case "city/loaded":
      return { ...state, currentCity: payload, isLoading: false };

    case "cities/loaded":
      return { ...state, cities: payload, isLoading: false };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, payload],
        isLoading: false,
        currentCity: payload,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== payload),
      };

    default:
      throw new Error("Unknown action: " + type);
  }
}

function AppContextProvider({ children }) {
  // const [cities, cities/loaded] = useState([]);
  // const [currentCity, setCurrentCity] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  function getCity(id) {
    if (id.toString() === state.currentCity?.id) return;

    // setIsLoading(true);
    dispatch({ type: "loading" });

    fetch(BASE_URL + "/cities/" + id)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "city/loaded", payload: data }))
      .catch((err) => dispatch({ type: "rejected", payload: err }));
  }

  async function createCity(city) {
    try {
      dispatch({ type: "loading" });

      const response = await fetch(BASE_URL + "/cities", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });

      const createdCity = await response.json();

      // cities/loaded((cities) => [...cities, createdCity]);
      dispatch({ type: "city/created", payload: createdCity });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });

      await fetch(BASE_URL + "/cities/" + id, {
        method: "delete",
      });

      // cities/loaded((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  useEffect(() => {
    dispatch({ type: "loading" });

    fetch(BASE_URL + "/cities")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "cities/loaded", payload: data }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AppContext.Provider
      value={{
        cities: state.cities,
        isLoading: state.isLoading,
        getCity,
        currentCity: state.currentCity,
        createCity,
        deleteCity,
      }}
    >
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
