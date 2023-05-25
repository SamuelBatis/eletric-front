import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  Stack,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  Link,
  Box,
  InputRightElement,
  chakra,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function singup() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <VStack bg = "gray.200">
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Heading>Cadastros</Heading>
          <Text fontSize="lg" color="gray.500">
            Insira seu usuário, senha e Status de administrador
          </Text>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl id="user" isRequired>
                  <FormLabel>Usuário</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="user"
                      placeholder="Insira o seu usuário"
                      onChange={(event) => setUser(event.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Senha</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Insira a sua senha"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm" 
                        onClick={handleShowClick}
                      >
                        {showPassword === true ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link>Esqueci a senha?</Link>
                  </FormHelperText>
                </FormControl>
                <FormControl id="admin" isRequired>
                  <FormLabel>Admin</FormLabel>
                  <Select>
                    <option value="option1">True</option>
                    <option value="option2">False</option>
                  </Select>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    ml = "105px"
                    width="50%"
                    mt = "50px"
                    /*onClick={login}*/
                  >
                    Cadastrar
                  </Button>
                </FormControl>
              </Stack>
            </form>
          </Box>
        </Stack>{" "}
      </Flex>
    </VStack>
  );
}
