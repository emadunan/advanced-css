import { gql, useQuery } from "@apollo/client";

const GET_ME = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

const useGetMe = () => {
  return useQuery<{ id: number; email: string }>(GET_ME);
};

export { useGetMe };
