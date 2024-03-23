import { useEffect, useState } from "react";
import router from "../components/router";

export const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    console.log("RENDERING");
    
    router.subscribe((state) => setPath(state.location.pathname));
  });

  return { path };
};
