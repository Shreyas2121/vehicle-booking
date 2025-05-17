import { create } from "zustand";

type BookingFormData = {
  firstName: string;
  lastName: string;
  wheels: number | null;
  vehicleTypeId: number | null;
  vehicleId: number | null;
  startDate: Date | null;
  endDate: Date | null;
};

type BookingStore = {
  data: BookingFormData;
  step: number;
  updateField: <K extends keyof BookingFormData>(
    key: K,
    value: BookingFormData[K]
  ) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  data: {
    firstName: "",
    lastName: "",
    wheels: null,
    vehicleTypeId: null,
    vehicleId: null,
    startDate: null,
    endDate: null,
  },
  step: 0,
  updateField: (key, value) =>
    set((state) => ({
      data: { ...state.data, [key]: value },
    })),
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  reset: () =>
    set(() => ({
      step: 0,
      data: {
        firstName: "",
        lastName: "",
        wheels: null,
        vehicleTypeId: null,
        vehicleId: null,
        startDate: null,
        endDate: null,
      },
    })),
}));
