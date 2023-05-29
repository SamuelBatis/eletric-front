import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Header from "@/components/Header";
import {
  fetchContasLuz,
  createContaLuz,
  deleteContaLuz,
} from "../services/api";

export default function Contas() {
  const [contas, setContas] = useState([]);
  const [valorConta, setValorConta] = useState("");
  const [dataConta, setDataConta] = useState("");

  useEffect(() => {
    loadContasLuz();
  }, []);

  const loadContasLuz = async () => {
    const contasLuz = await fetchContasLuz();
    setContas(contasLuz);
  };

  const handleAddConta = async () => {
    const novaConta = {
      valor: valorConta,
      data: dataConta,
      idUsuarios: 1,
    };

    const createdConta = await createContaLuz(novaConta);
    if (createdConta) {
      setValorConta("");
      setDataConta("");
      loadContasLuz(); // Atualiza os dados após adicionar a conta
    }
  };

  const handleDeleteConta = async (id) => {
    const deleted = await deleteContaLuz(id);
    if (deleted) {
      loadContasLuz(); // Atualiza os dados após excluir a conta
    }
  };

  return (
    <>
      <Header />
      <Box p={4}>
        <Heading as="h1" mb={4}>
          Contas de Luz
        </Heading>

        <VStack spacing={4} align="start" mb={4}>
          <FormControl>
            <FormLabel>Valor da Conta</FormLabel>
            <Input
              value={valorConta}
              onChange={(e) => setValorConta(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Data da Conta</FormLabel>
            <Input
              type="date"
              value={dataConta}
              onChange={(e) => setDataConta(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="blue" onClick={handleAddConta}>
            Adicionar Conta
          </Button>
        </VStack>

        <Divider mb={4} />

        {contas.length > 0 ? (
          <Table>
            <Thead>
              <Tr>
                <Th>Valor</Th>
                <Th>Data</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {contas.map((conta) => (
                <Tr key={conta.id}>
                  <Td>{conta.valor}</Td>
                  <Td>{conta.data}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteConta(conta.idContaLuz)}
                    >
                      Excluir
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>Nenhuma conta de luz registrada.</Text>
        )}
      </Box>
    </>
  );
}
