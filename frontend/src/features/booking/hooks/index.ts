import { useCreateMutation } from "../../../hooks/useApi";

export const useCreateBooking = () => {
  return useCreateMutation("/booking", "post");
};
