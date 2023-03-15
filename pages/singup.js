import { Button, FormControl, FormLabel, Heading, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";



export default function singup() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  

  return (
    <VStack p={10} spacing={8}>
      <Heading>Sing Up</Heading>
      <Text fontSize="lg" color="gray.500">
        Enter with a user, password and admin status to sing up
      </Text>
      <form>
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
        <FormControl id="admin" isRequired>
          <FormLabel>Admin</FormLabel>
          <Select >
            <option value="option1">True</option>
            <option value="option2">False</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="blue" >
          Sing Up
        </Button>
      </form>
    </VStack>
  )
}