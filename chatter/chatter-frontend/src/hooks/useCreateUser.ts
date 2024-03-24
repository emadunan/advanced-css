import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
    }
  }
`);

const useCreateUser = () => {
  return useMutation(createUserDocument);
};

export { useCreateUser };
