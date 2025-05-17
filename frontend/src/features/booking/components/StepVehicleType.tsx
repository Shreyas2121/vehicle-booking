import React from "react";
import { useGetVehicleTypesByWheels } from "../../vehicle/hooks";
import { useBookingStore } from "../../../store";
import Loader from "../../../components/loader";
import { useForm } from "react-hook-form";
import {
  vehicleTypeSchema,
  type VehcileTypeSchema,
} from "../schemas/vehcileTypeSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import StepWrapper from "./StepsWrapper";

const StepVehicleType = () => {
  const { updateField, nextStep } = useBookingStore();

  const {
    data: { wheels },
  } = useBookingStore();

  const { data, isLoading } = useGetVehicleTypesByWheels(wheels);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehcileTypeSchema>({
    resolver: zodResolver(vehicleTypeSchema),
  });

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = (formData: VehcileTypeSchema) => {
    updateField("vehicleTypeId", Number(formData.vehicleType));
    nextStep();
  };

  return (
    <StepWrapper>
      {data && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl component="fieldset" error={!!errors.vehicleType}>
            <FormLabel component="legend">Select Number of Wheels</FormLabel>
            <RadioGroup row>
              {data.map((vehicleType) => (
                <FormControlLabel
                  key={vehicleType.id}
                  value={vehicleType.id.toString()}
                  control={<Radio />}
                  label={`${vehicleType.name}`}
                  {...register("vehicleType")}
                />
              ))}
            </RadioGroup>
            {errors.vehicleType && (
              <FormHelperText>
                {errors.vehicleType.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Next
          </Button>
        </form>
      )}
    </StepWrapper>
  );
};

export default StepVehicleType;
