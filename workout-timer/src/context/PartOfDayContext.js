import { createContext, useContext, useState } from "react";

const PartOfDayContext = createContext();

export function PartOfDayProvider({ children }) {
  const [partOfDay, setPartOfDay] = useState(null);

  return (
    <PartOfDayContext.Provider value={{ partOfDay, setPartOfDay }}>
      {children}
    </PartOfDayContext.Provider>
  );
}

export function usePartOfDay() {
  const context = useContext(PartOfDayContext);

  if (!context)
    throw new Error("usePartOfDay was provoked out of its provider scope");

  return context;
}
