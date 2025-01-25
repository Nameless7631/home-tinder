import { Slider } from "./components/ui/slider";
import { useState } from "react";

const Survey = () => {
  // Initialize slider values as an array
  const [sliderValues, setSliderValues] = useState([0, 100]);

  // Handle slider value changes
  const handleSliderChange = (values) => {
    if (Array.isArray(values)) {
      setSliderValues(values); // Update state when slider changes
    }
  };

  return (
    <>
      <Slider
        width="200px"
        value={sliderValues} // Use value prop for controlled slider
        min={1} // Minimum value
        max={100} // Maximum value
        onValueChange={handleSliderChange} // Update state on change
      />
      <p>Selected Range: {sliderValues[0]} - {sliderValues[1]}</p>
    </>
  );
};

export { Survey };
