import { useBookingStore } from "../../../store";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, type NameSchema } from "../schemas/nameSchema";
import StepWrapper from "./StepsWrapper";
import { Button, FormLabel, TextField } from "@mui/material";

const StepName = () => {
  const { nextStep, updateField } = useBookingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameSchema>({
    resolver: zodResolver(nameSchema),
  });

  const onSubmit = (data: NameSchema) => {
    updateField("firstName", data.firstName);
    updateField("lastName", data.lastName);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepWrapper>
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-300 font-bold text-2xl">
            First, What's your name?
          </h2>
          <div>
            <FormLabel>First Name</FormLabel>
            <TextField
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div>
            <FormLabel>Last Name</FormLabel>
            <TextField
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <Button variant="contained" type="submit" fullWidth>
            Next
          </Button>
        </div>
      </StepWrapper>
    </form>
  );
};

export default StepName;
