import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    api
      .post("/login", { username: user, password })
      .then((response) => {
        const { token } = response.data;
        console.log("new session " + response.data.access_token)
        sessionStorage.setItem("token", response.data.access_token);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <VStack p={10} spacing={8}>
      <Heading>Login</Heading>
      <Text fontSize="lg" color="gray.500">
        Enter your user and password to log in
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl id="user" isRequired>
          <FormLabel>User</FormLabel>
          <Input
            type="user"
            placeholder="Enter your user"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Log in
        </Button>
      </form>
    </VStack>
  );
}
