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
  Stack,
  Text,
} from "@chakra-ui/react";
import BarChartComponent from "@/components/BarChartComponent";
import CardCarousel from "@/components/CardsCarousel";

const myCards = [
  {
    id: 1,
    content: (
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          Card 1
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Box>
    )
  },
  {
    id: 2,
    content: (
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          Card 2
        </Heading>
        <Text>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </Box>
    )
  },
  {
    id: 3,
    content: (
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          Card 3
        </Heading>
        <Text>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Text>
      </Box>
    )
  }
];


const getUserData = async () => {
  try {
    const response = await api.get("/conta-luz");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getUserData();
export default function Dashboard() {
  const [line, setLine] = useState(true);

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
          </CardHeader>
          <CardBody>
            {line === true ? <LineChartComponent /> : <BarChartComponent />}
          </CardBody>
        </Card>
      </Box>
      <CardCarousel cards={myCards}/>
    </>
  );
}
