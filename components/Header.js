import { useState } from "react";
import { Box, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.800"
      color="white"
    >
      <Box>
        <h1>Meu site</h1>
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          onClick={() => setMobileNav(!mobileNav)}
          icon={mobileNav ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          aria-label="Menu"
        />
      </Box>
      <Box
        display={{ base: mobileNav ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "center" }}
          justify={{ base: "center", md: "flex-end" }}
          pt={{ base: 4, md: 0 }}
        >
          <Box px={2}>Home</Box>
          <Box px={2}>Sobre</Box>
          <Box px={2}>Contato</Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
