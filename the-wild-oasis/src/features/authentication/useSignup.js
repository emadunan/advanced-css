import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signupMutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "Account succesfully created! please verify the new account from the user's email address"
      );
    },
  });

  return { signupMutate, isLoading };
}
