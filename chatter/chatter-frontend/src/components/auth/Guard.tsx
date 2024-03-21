import { FC } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { execludedRoutes } from "../../constants/excluded-routes";

interface GuardProps {
  children: JSX.Element;
}

const Guard: FC<GuardProps> = ({ children }) => {
  const { data: user } = useGetMe();

  return (
    <>
      {execludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
