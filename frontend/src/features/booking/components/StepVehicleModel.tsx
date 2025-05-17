import { useGetVehicleModelsByType } from "../../vehicle/hooks";
import { useBookingStore } from "../../../store";
import Loader from "../../../components/loader";
import { useForm } from "react-hook-form";

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
import {
  vehicleModelSchema,
  type VehcileModelSchema,
} from "../schemas/vehicleModelSchema";

const StepVehicleModal = () => {
  const {
    updateField,
    nextStep,
    data: { vehicleTypeId },
  } = useBookingStore();

  const { data, isLoading } = useGetVehicleModelsByType(vehicleTypeId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehcileModelSchema>({
    resolver: zodResolver(vehicleModelSchema),
  });

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = (formData: VehcileModelSchema) => {
    updateField("vehicleId", Number(formData.vehicleModel));
    nextStep();
  };

  return (
    <StepWrapper>
      {data && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl component="fieldset" error={!!errors.vehicleModel}>
            <FormLabel component="legend">Select Number of Wheels</FormLabel>
            <RadioGroup row>
              {data.map((vehicleModel) => (
                <FormControlLabel
                  key={vehicleModel.id}
                  value={vehicleModel.id.toString()}
                  control={<Radio />}
                  label={`${vehicleModel.name}`}
                  {...register("vehicleModel")}
                />
              ))}
            </RadioGroup>
            {errors.vehicleModel && (
              <FormHelperText>
                {errors.vehicleModel.message?.toString()}
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

export default StepVehicleModal;
