import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  fetchDepartments,
  createDepartment,
} from "../services/api";
import Header from "@/components/Header";


/*const departmentsData = [
  {
    name: "Departamento 1",
    machines: [
      {
        id: 1,
        name: "Máquina A",
        voltage: "220V",
        usageTime: "8 horas",
      },
      {
        id: 2,
        name: "Máquina B",
        voltage: "110V",
        usageTime: "6 horas",
      },
    ],
  },
  {
    name: "Departamento 2",
    machines: [
      {
        id: 3,
        name: "Máquina X",
        voltage: "220V",
        usageTime: "10 horas",
      },
      {
        id: 4,
        name: "Máquina Y",
        voltage: "110V",
        usageTime: "4 horas",
      },
    ],
  },
  // Adicione mais departamentos e máquinas conforme necessário
];*/

export default function Departamentos() {
  const [isMachineModalOpen, setMachineModalOpen] = useState(false);
  const [isDepartmentModalOpen, setDepartmentModalOpen] = useState(false);
  const [newMachineName, setNewMachineName] = useState("");
  const [newMachineVoltage, setNewMachineVoltage] = useState("");
  const [newMachineUsageTime, setNewMachineUsageTime] = useState("");
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        // Handle error fetching departments
      }
    };
    const getMachines = async () => {
      try {
        const machinesData = await fetchMachines();
        setMachines(machinesData);
      } catch (error) {
        // Handle error fetching machines
      }
    };

    //getMachines();

    getDepartments();
  }, []);




  const handleAddMachine = async (departmentIndex) => {
    const updatedDepartments = [...departments];
    const newMachine = {
      id: Date.now(),
      name: newMachineName,
      voltage: newMachineVoltage,
      usageTime: newMachineUsageTime,
    };

    try {
      await createMachine(newMachine);
      updatedDepartments[departmentIndex].machines.push(newMachine);
      setDepartments(updatedDepartments);
      setMachineModalOpen(false);
      setNewMachineName("");
      setNewMachineVoltage("");
      setNewMachineUsageTime("");
    } catch (error) {
      // Handle error creating machine
    }
  };


  const handleDeleteMachine = async (departmentIndex, machineId) => {
    try {
      await api.delete(`/machine/${machineId}`);
      const updatedDepartments = [...departments];
      const machines = updatedDepartments[departmentIndex].machines;
      const updatedMachines = machines.filter((machine) => machine.id !== machineId);
      updatedDepartments[departmentIndex].machines = updatedMachines;
      setDepartments(updatedDepartments);
    } catch (error) {
      // Handle error deleting machine
    }
  };


  const handleAddDepartment = async () => {
    const newDepartment = {
      nome: newDepartmentName,
    };

    try {
      await createDepartment(newDepartment);
      setDepartments([...departments, newDepartment]);
      setDepartmentModalOpen(false);
      setNewDepartmentName("");
      console.log("entrou")
    } catch (error) {
      // Handle error creating department
    }
  };
  const calculateTotalCost = (voltage, usageTime) => {
    // Suponha que o custo por minuto seja de R$ 0,10 para 110V e R$ 0,15 para 220V
    const costPerMinute = voltage === "110V" ? 0.10 : 0.15;
    const minutes = parseInt(usageTime.split(" ")[0]); // Extrai o valor numérico do tempo de uso (assumindo o formato "X horas")
    const totalCost = costPerMinute * minutes;
    return totalCost.toFixed(2); // Retorna o custo total formatado com duas casas decimais
  };


  return (
    <>
      <Header />
      <Box p={4}>
        <Heading as="h1" mb={4}>
          Departamentos
        </Heading>

        {departments.map((department, departmentIndex) => (
          <Box key={departmentIndex} p={4} borderWidth={1} borderRadius="md" mb={4}>
            <Heading as="h2" size="md" mb={2}>
              {department.nome}
            </Heading>
            <Text>Máquinas:</Text>
            <HStack align="start" spacing={4} mt={2} flexWrap="wrap">
              {/*department.machines.map((machine) => (
              <Box
                key={machine.id}
                borderWidth={1}
                borderRadius="md"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <VStack align="start" spacing={1}>
                  <Text>
                    <strong>Nome:</strong> {machine.name}
                  </Text>
                  <Text>
                    <strong>Voltagem:</strong> {machine.voltage}
                  </Text>
                  <Text>
                    <strong>Tempo de Uso:</strong> {machine.usageTime}
                  </Text>
                  <Text>
                    <strong>Custo Total:</strong> {calculateTotalCost(machine.voltage, machine.usageTime)}
                  </Text>
                </VStack>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleDeleteMachine(departmentIndex, machine.id)}
                />
              </Box>
            ))*/}
            </HStack>
            <Button
              mt={4}
              colorScheme="blue"
              size="sm"
              onClick={() => setMachineModalOpen(true)}
            >
              Adicionar Máquina
            </Button>
          </Box>
        ))}

        <IconButton
          icon={<AddIcon />}
          colorScheme="blue"
          size="lg"
          position="fixed"
          bottom={4}
          right={4}
          onClick={() => setDepartmentModalOpen(true)}
        />

        {/* Modal para adicionar máquinas */}
        <Modal
          isOpen={isMachineModalOpen}
          onClose={() => setMachineModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Máquina</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nome da Máquina</FormLabel>
                <Input
                  value={newMachineName}
                  onChange={(e) => setNewMachineName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Voltagem</FormLabel>
                <Input
                  value={newMachineVoltage}
                  onChange={(e) => setNewMachineVoltage(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Tempo de Uso</FormLabel>
                <Input
                  value={newMachineUsageTime}
                  onChange={(e) => setNewMachineUsageTime(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleAddMachine(0)} // Passe o índice do departamento correto
              >
                Adicionar
              </Button>
              <Button onClick={() => setMachineModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal para adicionar departamentos */}
        <Modal
          isOpen={isDepartmentModalOpen}
          onClose={() => setDepartmentModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Departamento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nome do Departamento</FormLabel>
                <Input
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleAddDepartment}
              >
                Adicionar
              </Button>
              <Button onClick={() => setDepartmentModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

    </>
  );
}
