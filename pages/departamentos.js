import Header from "@/components/Header";
import { Button, Card } from "@chakra-ui/react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const departments = [
  {
    name: "Departamento 1",
    machines: ["Máquina A", "Máquina B", "Máquina C"],
  },
  {
    name: "Departamento 2",
    machines: ["Máquina X", "Máquina Y", "Máquina Z"],
  },
];

export default function Departamentos() {
  return (
    <>
      <Header />
      <Box p={4}>
        <Heading as="h1" mb={4}>
          Departamentos
        </Heading>

        {departments.map((department, index) => (
          <Box key={index} p={4} borderWidth={1} borderRadius="md" mb={4}>
            <Heading as="h2" size="md" mb={2}>
              {department.name}
            </Heading>
            <Text>Máquinas:</Text>
            <VStack align="start" spacing={2} mt={2}>
              {department.machines.map((machine, i) => (
                <Text key={i}>{machine}</Text>
              ))}
            </VStack>
            <Button colorScheme="blue" size="xs"> Add Maquina </Button>
          </Box>
        ))}
      </Box>{" "}
      <Button colorScheme="blue" ml="45%"> Add Departamento</Button>
    </>
  );
}
