import { useState } from "react";
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

export default function TwoBallsSlider() {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  const handleChange = (values) => {
    setMin(values[0]);
    setMax(values[1]);
  };

  return (
    <Box w={300}>
      <Slider
        defaultValue={[min, max]}
        onChange={handleChange}
        min={0}
        max={100}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} />
        <SliderThumb boxSize={6} />
      </Slider>
      <Box display="flex" justifyContent="space-between">
        <Box>{min}</Box>
        <Box>{max}</Box>
      </Box>
    </Box>
  );
}
