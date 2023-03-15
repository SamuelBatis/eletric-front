import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';

export default function login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle login logic here
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