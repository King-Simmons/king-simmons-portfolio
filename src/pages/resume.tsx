import { Heading, Stack, Text } from "@chakra-ui/react";

const ResumePage = () => {
  return (
    <Stack spacing={4}>
      <Heading as="h1" size="lg">
        Resume
      </Heading>
      <Text color="gray.600">
        Resume content will render from JSON in a future PR.
      </Text>
    </Stack>
  );
};

export default ResumePage;
