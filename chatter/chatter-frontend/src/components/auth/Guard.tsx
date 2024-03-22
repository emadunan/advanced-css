import { FC, useEffect } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { execludedRoutes } from "../../constants/excluded-routes";
import { authenticatedVar } from "../../constants/authenticated";

interface GuardProps {
  children: JSX.Element;
}

const Guard: FC<GuardProps> = ({ children }) => {
  const { data: user } = useGetMe();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  return (
    <>
      {execludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
