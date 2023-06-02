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
  useShortcut,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  fetchDepartments,
  createDepartment,
  createMachine,
  findUser,
  deleteMachine,
  fetchMachines,
  decodedToken,
  deleteDepartment,
} from "../services/api";
import Header from "@/components/Header";

export default function Departamentos() {
  const [isMachineModalOpen, setMachineModalOpen] = useState(false);
  const [isDepartmentModalOpen, setDepartmentModalOpen] = useState(false);
  const [newMachineName, setNewMachineName] = useState("");
  const [newMachineVoltage, setNewMachineVoltage] = useState("");
  const [newMachineUsageTime, setNewMachineUsageTime] = useState("");
  const [newMachineTotalCost, setNewMachineTotalCost] = useState(""); // Adicionado novo estado
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [userData, setUserData] = useState();
  const [totalCostByDepartment, setTotalCostByDepartment] = useState([]);
  const [indexDepartamentValue, setIndexDepartamentValue] = useState("");
  const [newDepartment, setNewDepartment] = useState(false)


  const handleWithOpenModalAndSetIndexValue = (index) => {
    setMachineModalOpen(true);
    setIndexDepartamentValue(index);
  } 


  useEffect(() => {
    const getUserInfos = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userId = decodedToken(token);
        const user = await findUser(userId);
        setUserData(userId);
      } catch (error) {
        // Handle error
      }
    };

    const fetchData = async () => {
      try {
        const departmentsData = await fetchDepartments();
        const machinesData = await fetchMachines();

        // Organizar as máquinas em seus respectivos departamentos
        const departmentsWithMachines = departmentsData.map((department) => {
          const machines = machinesData.filter(
            (machine) => machine.idDepartamento === department.idDepartamento
          );
          const totalCost = machines.reduce(
            (accumulator, machine) => accumulator + parseFloat(machine.custoTotal),
            0
          );
          return {
            ...department,
            machines: machines,
            totalCost: totalCost.toFixed(2),
          };
        });

        setDepartments(departmentsWithMachines);

        // Calcular os custos totais por departamento
        const totalCostByDepartment = departmentsWithMachines.reduce(
          (accumulator, department) => {
            return {
              ...accumulator,
              [department.idDepartamento]: department.totalCost,
            };
          },
          {}
        );

        setTotalCostByDepartment(totalCostByDepartment);
      } catch (error) {
        // Handle error fetching data
      }
    };


    fetchData();
    getUserInfos();
  }, []);
  useEffect(() => {
    const getUserInfos = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userId = decodedToken(token);
        const user = await findUser(userId);
        setUserData(userId);
      } catch (error) {
        // Handle error
      }
    };
  
    const fetchData = async () => {
      try {
        const departmentsData = await fetchDepartments();
        const machinesData = await fetchMachines();
  
        // Organize the machines into their respective departments
        const departmentsWithMachines = departmentsData.map((department) => {
          const machines = machinesData.filter(
            (machine) => machine.idDepartamento === department.idDepartamento
          );
          const totalCost = machines.reduce(
            (accumulator, machine) => accumulator + parseFloat(machine.custoTotal),
             0
          );
          return {
            ...department,
            machines: machines,
            totalCost: totalCost.toFixed(2),
          };
        });
  
        setDepartments(departmentsWithMachines);
  
        // Calculate the total costs by department
        const totalCostByDepartment = departmentsWithMachines.reduce(
          (accumulator, department) => {
            return {
              ...accumulator,
              [department.idDepartamento]: department.totalCost,
            };
          },
          {}
        );
  
        setTotalCostByDepartment(totalCostByDepartment);
      } catch (error) {
        // Handle error fetching data
      }
    };
  
    fetchData();
    getUserInfos();
  }, [newDepartment]);

  const handleDeleteMachine = async (departmentIndex, machineId) => {
    try {
      await deleteMachine(machineId); // Chamada para a função deleteMachine da API

      const departmentsData = await fetchDepartments();
      const machinesData = await fetchMachines();

      // Organizar as máquinas em seus respectivos departamentos
      const departmentsWithMachines = departmentsData.map((department) => {
        const machines = machinesData.filter(
          (machine) => machine.idDepartamento === department.idDepartamento
        );
        // Somar os custos totais por máquina
        const totalCost = machines.reduce((sum, machine) => sum + parseFloat(machine.custoTotal), 0);
        return {
          ...department,
          machines: machines.map(machine => ({
            ...machine,
            custoTotal: parseFloat(machine.custoTotal).toFixed(2) // Formatar custo total com duas casas decimais
          })),
          totalCost: totalCost.toFixed(2), // Adicionar o custo total do departamento
        };
      });

      setDepartments(departmentsWithMachines);
    } catch (error) {
      // Tratar erro de exclusão da máquina
    }
  };

  const handleAddMachine = async () => {
    const department = departments[indexDepartamentValue];
    const newMachine = {
      nome: newMachineName,
      power: Number(newMachineVoltage).toFixed(1),
      tempoDeUso: Number(newMachineUsageTime).toFixed(1),
      custoTotal: calculateTotalCost(newMachineVoltage, newMachineUsageTime),
      idUsuarios: 1,
      idDepartamento: department.idDepartamento,
    };

    try {
      await createMachine(newMachine);
      department.machines.push(newMachine);
      // Atualizar o custo total do departamento
      const totalCost = department.machines.reduce((sum, machine) => sum + parseFloat(machine.custoTotal), 0);
      department.totalCost = totalCost.toFixed(2);
      setMachineModalOpen(false);
      setNewMachineName("");
      setNewMachineVoltage("");
      setNewMachineUsageTime("");
      setNewDepartment(!newDepartment)
    } catch (error) {
      // Handle error creating machine
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
      setNewDepartment(!newDepartment)
    } catch (error) {
      // Handle error creating department
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    try {
      await deleteDepartment(departmentId);

      const departmentsData = await fetchDepartments();
      const machinesData = await fetchMachines();

      // Organize as máquinas em seus respectivos departamentos
      const departmentsWithMachines = departmentsData.map((department) => {
        const machines = machinesData.filter(
          (machine) => machine.idDepartamento === department.idDepartamento
        );
        return {
          ...department,
          machines: machines,
        };
      });

      setDepartments(departmentsWithMachines);
    } catch (error) {
      // Trate o erro de exclusão do departamento
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

        {departments?.map((department, departmentIndex) => (

          <Box key={departmentIndex} p={4} borderWidth={1} borderRadius="md" mb={4}>
            <HStack justify="space-between">
              <Heading as="h2" size="md" mb={2}>
                {department.nome}
              </Heading>
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                onClick={() => handleDeleteDepartment(department.idDepartamento)}
              />
            </HStack>
            <Text>Máquinas:</Text>
            <HStack align="start" spacing={4} mt={2} flexWrap="wrap">
              {department.machines?.map((machine) => (
                <Box
                  key={machine.idMaquinas}
                  borderWidth={1}
                  borderRadius="md"
                  p={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <VStack align="start" spacing={1}>
                    <Text>
                      <strong>Nome:</strong> {machine.nome}
                    </Text>
                    <Text>
                      <strong>Power:</strong> {machine.power}
                    </Text>
                    <Text>
                      <strong>Tempo de Uso:</strong> {machine.tempoDeUso}
                    </Text>
                    <Text>
                      <strong>Custo Total:</strong> {machine.custoTotal}
                    </Text>
                  </VStack>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleDeleteMachine(departmentIndex, machine.idMaquinas)}
                  />
                </Box>
              ))}
            </HStack>
            <Text>
              <strong>Custo Total do Departamento:</strong> {totalCostByDepartment[department.idDepartamento]}
            </Text>
            <Button
              mt={4}
              colorScheme="blue"
              size="sm"
              onClick={() => handleWithOpenModalAndSetIndexValue(departmentIndex)}
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
                <FormLabel>Power</FormLabel>
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
                onClick={() => handleAddMachine()} // Passe o id do departamento correto
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
