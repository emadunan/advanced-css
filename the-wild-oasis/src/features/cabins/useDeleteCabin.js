import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryCient = useQueryClient();
  const { isLoading: isDeletingCabin, mutate: deleteCabinMutate } = useMutation(
    {
      mutationFn: deleteCabin,
      onSuccess: () => {
        toast.success("Cabin successfully deleted!");
        queryCient.invalidateQueries({
          queryKey: ["cabins"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  return { deleteCabinMutate, isDeletingCabin };
}
