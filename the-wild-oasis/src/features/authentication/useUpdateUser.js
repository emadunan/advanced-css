import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUserMutate, isLoading: isUpdatingUser } = useMutation({
    mutationFn: ({ password, fullName, avatar }) => {
      updateCurrentUser({ password, fullName, avatar });
    },
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUserMutate, isUpdatingUser };
}
