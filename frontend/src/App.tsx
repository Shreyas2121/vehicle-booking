import "./App.css";

import { steps } from "./features/booking/steps";
import { useBookingStore } from "./store";

function App() {
  const step = useBookingStore((state) => state.step);
  const CurrentStep = steps[step];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <CurrentStep />
    </div>
  );
}

export default App;
