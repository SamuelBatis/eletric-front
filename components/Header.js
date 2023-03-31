import { Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Box bg="gray.900" py={4}>
      <Flex alignItems="center" justifyContent="center">
        <Stack direction="row" spacing={4} alignItems="center">
          <Link href="/" passHref>
            <Text as="a" fontWeight="bold" fontSize="2xl" color="white">
              Eletric
            </Text>
          </Link>
          <Link href="/about" passHref>
            <Text as="a" fontSize="lg" color="white">
              About
            </Text>
          </Link>
          <Link href="/contact" passHref>
            <Text as="a" fontSize="lg" color="white">
              Contact
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
