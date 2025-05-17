import { useGetWheels } from "../../vehicle/hooks";
import Loader from "../../../components/loader";
import { useForm } from "react-hook-form";
import { wheelsSchema, type WheelsSchema } from "../schemas/wheelsSchema";
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
import { useBookingStore } from "../../../store";

const StepWheels = () => {
  const { updateField, nextStep } = useBookingStore();

  const { data, isLoading } = useGetWheels();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WheelsSchema>({
    resolver: zodResolver(wheelsSchema),
  });

  if (isLoading) {
    return <Loader />;
  }

  const wheels = data?.data.map((wheel) => wheel.wheels);

  const onSubmit = (formData: WheelsSchema) => {
    updateField("wheels", Number(formData.wheels));
    nextStep();
  };

  return (
    <StepWrapper>
      {wheels && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl component="fieldset" error={!!errors.wheels}>
            <FormLabel component="legend">Select Number of Wheels</FormLabel>
            <RadioGroup row>
              {wheels.map((wheelCount) => (
                <FormControlLabel
                  key={wheelCount}
                  value={wheelCount}
                  control={<Radio />}
                  label={`${wheelCount} Wheels`}
                  {...register("wheels")}
                />
              ))}
            </RadioGroup>
            {errors.wheels && (
              <FormHelperText>
                {errors.wheels.message?.toString()}
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

export default StepWheels;
