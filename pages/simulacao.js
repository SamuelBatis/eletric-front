import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import Header from "@/components/Header";
import {
  insertSimulacao,
  getAllSimulacoes,
  deleteSimulacao,
} from "../services/api"; // Import the functions from the api.js file

export default function Simulacao() {
  const [maquinas, setMaquinas] = useState([]);
  const [simulacoes, setSimulacoes] = useState([]);
  const [nomeMaquina, setNomeMaquina] = useState("");
  const [powerMaquina, setPowerMaquina] = useState("");
  const [tempoUsoMaquina, setTempoUsoMaquina] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [deletedMachine, setDeletedMachine] = useState(false);
  const [addedMachine, setAddedMachine] = useState(false);

  useEffect(() => {
    const fetchSimulacoes = async () => {
      try {
        const simulacoes = await getAllSimulacoes(); // Use the getAllSimulacoes function from the API
        setMaquinas(simulacoes);
      } catch (error) {
        // Handle error fetching machines
      }
    };

    fetchSimulacoes();
  }, [deletedMachine, addedMachine]);

  useEffect(() => {
    const simularValoresContas = () => {
      const contasSimuladas = maquinas.map((maquina) => {
        const power = Number(maquina.valor);
        const tempoUso = Number(maquina.tempoDeUso);
        const custoTotal = calculateTotalCost(power, tempoUso);
        return {
          ...maquina,
          custoTotal,
        };
      });

      setSimulacoes(contasSimuladas);
    };

    simularValoresContas();
  }, [maquinas]);

  const calculateTotalCost = (voltage, usageTime) => {
    const costPerMinute = voltage === "110V" ? 0.10 : 0.15;
    const hours = parseFloat(usageTime);
    const minutes = hours * 60;
    const totalCost = costPerMinute * minutes;
    return totalCost.toFixed(2);
  };

  const handleAddMachine = async () => {
    const newMachine = {
      nome: nomeMaquina,
      valor: Number(powerMaquina).toFixed(1),
      tempoDeUso: Number(tempoUsoMaquina).toFixed(1),
      custoTotal: calculateTotalCost(Number(powerMaquina), Number(tempoUsoMaquina)),
      idUsuarios: 1,
      date: selectedMonth,
    };

    try {
      await insertSimulacao(newMachine); // Use the insertSimulacao function from the API
      setMaquinas((prevMaquinas) => [...prevMaquinas, newMachine]);
      setNomeMaquina("");
      setPowerMaquina("");
      setTempoUsoMaquina("");
      setSelectedMonth("");
      setDeletedMachine((prevState) => !prevState);
    } catch (error) {
      // Handle error creating machine
    }
  };

  const handleDeleteMachine = async (id) => {
    try {
      await deleteSimulacao(id); // Use the deleteSimulacao function from the API
      setMaquinas((prevMaquinas) => prevMaquinas.filter((maquina) => maquina.id !== id));
      setDeletedMachine((prevState) => !prevState);
    } catch (error) {
      // Handle error deleting machine
    }
  };

  return (
    <>
      <Header />
      <Box p={4}>
        <Heading as="h1" mb={4}>
          Simulações de Contas de Luz
        </Heading>

        <VStack spacing={4} align="start" mb={4}>
          <FormControl>
            <FormLabel>Nome da Máquina</FormLabel>
            <Input
              value={nomeMaquina}
              onChange={(e) => setNomeMaquina(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Power</FormLabel>
            <Input
              value={powerMaquina}
              onChange={(e) => setPowerMaquina(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tempo de Uso</FormLabel>
            <Input
              value={tempoUsoMaquina}
              onChange={(e) => setTempoUsoMaquina(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Mês</FormLabel>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              placeholder="Selecione o mês"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option September="September">September</option>
              <option October="October">October</option>
              <option October="November">November</option>
              <option October="December">December</option>
              {/* Add the remaining months */}
            </Select>
          </FormControl>

          <Button colorScheme="blue" onClick={handleAddMachine}>
            Adicionar Máquina
          </Button>
        </VStack>

        {simulacoes.length > 0 ? (
          <Box>
            <Text mb={2}>Simulações de Contas de Luz:</Text>
            {simulacoes.map((simulacao, index) => (
              <Box key={index} borderWidth={1} borderRadius="md" p={2} mb={2}>
                <Text fontWeight="bold">{simulacao.nome}</Text>
                <Text>Power: {simulacao.valor} kWh</Text>
                <Text>Tempo de Uso: {simulacao.tempoDeUso} horas</Text>
                <Text>Custo Total: R$ {simulacao.custoTotal}</Text>
                <Button
                  colorScheme="red"
                  size="sm"
                  mt={2}
                  onClick={() => handleDeleteMachine(simulacao.idSimulacao)}
                >
                  Deletar Máquina
                </Button>
              </Box>
            ))}
          </Box>
        ) : (
          <Text>Nenhuma máquina registrada.</Text>
        )}
      </Box>
    </>
  );
}
