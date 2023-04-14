import Header from "@/components/Header";
import api from "@/services/api";
import { useEffect, useState } from "react";
import LineChartComponent from "@/components/LineChartComponent";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from "@chakra-ui/react";
import BarChartComponent from "@/components/BarChartComponent";
import CardCarousel from "@/components/CardsCarousel";
import TwoBallsSlider from "@/components/TwoBallsSlider";
//import Slider from "react-slick";


const getUserData = async () => {
  try {
    const response = await api.get("/conta-luz");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default function Dashboard() {

  /*useEffect(() => {
    const reponse = getUserData();
  }, [])*/

  const [line, setLine] = useState(true);
  const [values, setValues] = useState([10, 50]);
  const handleChange = (newValues) => {
    setValues(newValues);
  };


  const changeChart = () => {
    setLine(!line);
  };

  let chart;

  useEffect(() => {
    if (line === true) {
      chart = <LineChartComponent />;
    } else {
      chart = <BarChartComponent />;
    }
  }, [line]);

  return (
    <>
      <Header />
      <Box mt="9">
        <Card>
          <CardHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <RadioGroup>
                <Stack direction="row">
                  <Radio isChecked={!line} onChange={() => setLine(!line)}>
                    Bar
                  </Radio>
                  <Radio isChecked={line} onChange={() => setLine(!line)}>
                    Line
                  </Radio>
                </Stack>
              </RadioGroup>
              <RangeSlider aria-label={['min', 'max']} defaultValue={[10, 30]} w={300}>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </Flex>
          </CardHeader>

          <CardBody>
            {line === true ? <LineChartComponent /> : <BarChartComponent />}
          </CardBody>
        </Card>
      </Box>

      <Box mt="9">
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          <Card flex="1">
            <CardHeader>
              Simulação
            </CardHeader>
            <CardBody>
              Valor: 4300
            </CardBody>
          </Card>
          <Card flex="1">
            <CardHeader>
              Real
            </CardHeader>
            <CardBody>
              Valor: 3490
            </CardBody>
          </Card>
        </Flex>
      </Box>

    </>
  );
}
