import { Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Box bg="gray.900" py={4}>
      <Flex alignItems="center" justifyContent="center">
        <Stack direction="row" spacing={4} alignItems="center">
          <Link href="/dashboard" passHref>
            <Text as="span" fontWeight="bold" fontSize="2xl" color="white">
              Eletric
            </Text>
          </Link>
          <Link href="/departamentos" passHref>
            <Text as="span" fontSize="md" color="white">
              Departamentos
            </Text>
          </Link>
          <Link href="/simulacao" passHref>
            <Text as="span" fontSize="md" color="white">
              Simulação
            </Text>
          </Link>
          <Link href="/contas" passHref>
            <Text as="span" fontSize="md" color="white">
              Contas
            </Text>
          </Link>
        </Stack>
        <Spacer />
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="white">
            User Name
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
