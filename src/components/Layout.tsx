import Link from "next/link";
import { Box, Container, Flex, HStack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex minHeight="100vh" direction="column">
      <Box as="header" borderBottom="1px" borderColor="gray.200" py={4}>
        <Container maxW="6xl">
          <Flex align="center" justify="space-between">
            <Text fontWeight="bold">King Simmons</Text>
            <HStack spacing={6}>
              <Link href="/">Home</Link>
              <Link href="/resume">Resume</Link>
              <Link href="/contact">Contact</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box as="main" flex="1" py={10}>
        <Container maxW="6xl">{children}</Container>
      </Box>

      <Box as="footer" borderTop="1px" borderColor="gray.200" py={4}>
        <Container maxW="6xl">
          <Text fontSize="sm" color="gray.500">
            © {new Date().getFullYear()} King Simmons. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Flex>
  );
};

export default Layout;
