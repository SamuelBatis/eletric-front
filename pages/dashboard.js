import Header from "@/components/Header";
import api, { decodeToken, fetchContasLuz, getAllSimulacoes } from "@/services/api";
import { useEffect, useState } from "react";
import LineChartComponent from "@/components/LineChartComponent";
import { format } from "date-fns";

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
  const [userName, setUserName] = useState("");
  const [contasLuz, setContasLuz] = useState([]);
  const [simulacao, setSimulacao] = useState([]);
  const sortedData = contasLuz.sort((a, b) => new Date(a.data) - new Date(b.data));
  const formattedData = sortedData.map((item) => ({
    ...item,
    data: format(new Date(item.data), "MMMM"),
  }));
  console.log("simulacao ", simulacao)

  useEffect(() => {
    loadContasLuz();
    loadSimulacoes();
  }, []);

  const loadSimulacoes = async () => {
    try {
      const simulacoes = await getAllSimulacoes();
      console.log("sim ", simulacoes)
      const sortedSimulacoes = simulacoes.sort((a, b) => new Date(a.date) - new Date(b.date));
      const summedSimulacoes = [];
      let prevDate = null;
      let sum = 0;
      for (let i = 0; i < sortedSimulacoes.length; i++) {
        const simulacao = sortedSimulacoes[i];
        if (prevDate === null || simulacao.date === prevDate) {
          sum += simulacao.valor;
        } else {
          summedSimulacoes.push({ data: prevDate, valor: sum });
          sum = simulacao.valor;
        }
        prevDate = simulacao.date;
      }
      if (prevDate !== null) {
        summedSimulacoes.push({ data: prevDate, valor: sum });
      }
      setSimulacao(summedSimulacoes);
    } catch (error) {
      console.error(error)
    }
  }

  const loadContasLuz = async () => {
    try {
      const contasLuzData = await fetchContasLuz();
      setContasLuz(contasLuzData);
    } catch (error) {
      console.error(error);
    }
  };

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
      <Header  />
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
            </Flex>
          </CardHeader>

          <CardBody>
            {line === true ? <LineChartComponent data={formattedData} simulacao={simulacao}/> : <BarChartComponent data={formattedData} simulacao={simulacao} />}
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
              Valor: {simulacao.length > 0 ? simulacao[simulacao.length - 1].valor : 0}
            </CardBody>
          </Card>
          <Card flex="1">
            <CardHeader>
              Real
            </CardHeader>
            <CardBody>
              Valor: {sortedData.length > 0 ? sortedData[sortedData.length - 1].valor : 0}
            </CardBody>
          </Card>
        </Flex>
      </Box>

    </>
  );
}
