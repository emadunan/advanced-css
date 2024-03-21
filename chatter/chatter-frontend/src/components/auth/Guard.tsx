import { FC } from "react";
import { useGetMe } from "../../hooks/useGetMe";

interface GuardProps {
  children: JSX.Element;
}

const Guard: FC<GuardProps> = ({ children }) => {
  const { data: user } = useGetMe();
  console.log(user);
  
  return children;
};

export default Guard;
