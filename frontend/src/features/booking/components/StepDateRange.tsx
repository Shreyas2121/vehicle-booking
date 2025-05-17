import { Controller, useForm } from "react-hook-form";
import {
  bookingSchema,
  type BookingFormData,
} from "../schemas/dateBookingSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import StepWrapper from "./StepsWrapper";
import { Button, FormHelperText, FormLabel } from "@mui/material";
import { useCreateBooking } from "../hooks";
import { useBookingStore } from "../../../store";

const StepDateRange = () => {
  const { data, reset } = useBookingStore();
  const bookingM = useCreateBooking();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      dateRange: { from: undefined, to: undefined },
    },
  });

  const onSubmit = (formData: BookingFormData) => {
    bookingM.mutate(
      {
        ...data,
        startDate: formData.dateRange?.from,
        endDate: formData.dateRange?.to,
      },
      {
        onSuccess: () => {
          alert("Booking Created Successfully");
          reset();
        },
      }
    );
  };
  return (
    <StepWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel component="legend" sx={{ mb: 1 }}>
          Select Booking Date Range
        </FormLabel>

        <Controller
          control={control}
          name="dateRange"
          render={({ field: { onChange, value } }) => (
            <DayPicker
              mode="range"
              selected={{
                from: value?.from,
                to: value?.to,
              }}
              onSelect={onChange}
              pagedNavigation
            />
          )}
        />
        {errors.dateRange && (
          <FormHelperText error>{errors.dateRange.message}</FormHelperText>
        )}

        <Button
          disabled={bookingM.isPending}
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </StepWrapper>
  );
};

export default StepDateRange;
