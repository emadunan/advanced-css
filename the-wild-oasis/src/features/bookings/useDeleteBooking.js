import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryCient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeletingBooking, mutate: deleteBookingMutate } =
    useMutation({
      mutationFn: deleteBooking,
      onSuccess: () => {
        toast.success("booking successfully deleted!");
        queryCient.invalidateQueries({
          queryKey: ["bookings"],
        });
        navigate("/bookings");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { deleteBookingMutate, isDeletingBooking };
}
