import { type ReactNode } from "react";

const StepWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        {children}
      </div>
    </div>
  );
};

export default StepWrapper;
