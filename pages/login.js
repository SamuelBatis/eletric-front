import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("entrou ");
    // Aqui você pode fazer a requisição HTTP com axios para o endpoint de login
    // e lidar com a resposta do servidor.
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
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
        <Button type="submit" colorScheme="blue">
          Log in
        </Button>
      </form>
    </VStack>
  );
} 