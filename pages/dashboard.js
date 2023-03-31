import Header from "@/components/Header";
import api from "@/services/api";
import { useEffect } from "react";
import LineChartComponent from "@/components/LineChartComponent";
import { Box, Card, CardBody, Flex } from "@chakra-ui/react";

const getUserData = async () => {
  try {
    const response = await api.get('/conta-luz')
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

getUserData()
export default function Dashboard() {
  /* async function getData() {
     let data;
     data = await api.get("/conta-luz")
     console.log(data)
     return data
   }
   useEffect(() => {
     const response = () => getData()
   }, [])*/
  return (
    <>
      <Header />
      <Box mt="9">
        <Card>
          <CardBody>
            <LineChartComponent />
          </CardBody>
        </Card>
      </Box>

    </>
  );
}
