import { Button, Heading, Stack, Text } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Stack spacing={6}>
      <Heading as="h1" size="xl">
        Portfolio Home
      </Heading>
      <Text color="gray.600">
        Hero content will land here in the next PR.
      </Text>
      <Button colorScheme="teal" width="fit-content">
        View Resume
      </Button>
    </Stack>
  );
};

export default HomePage;
