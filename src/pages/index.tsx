import NextLink from "next/link";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import resumeData from "../data/resume.json";

const HomePage = () => {
  return (
    <Stack spacing={10}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center">
        <Stack spacing={4}>
          <Heading as="h1" size="2xl">
            King Simmons · Backend Systems Engineer
          </Heading>
          <Tag
            alignSelf="flex-start"
            colorScheme="teal"
            fontSize="sm"
            px={3}
            py={1}
          >
            Distributed systems, cloud platforms, and scalable services
          </Tag>
          <Text color="gray.600" fontSize="lg">
            {resumeData.summary}
          </Text>
          <Text color="gray.600">
            Core focus: {resumeData.skills.slice(0, 6).join(" · ")}
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
            <Button as={NextLink} href="/resume" colorScheme="teal">
              View Resume
            </Button>
            <Button as={NextLink} href="/contact" variant="outline">
              Let&apos;s Connect
            </Button>
          </Stack>
        </Stack>
        <Box
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="2xl"
          bg="gray.50"
          minH={{ base: "240px", md: "280px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          px={6}
        >
          <Text color="gray.500" fontSize="sm">
            Minimalist memoji placeholder
          </Text>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {resumeData.highlights.map((item) => (
          <Box
            key={item.summary}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            p={6}
            bg="white"
          >
            <Heading as="h2" size="md" mb={2}>
              {item.summary}
            </Heading>
            <Text color="gray.600">{item.detail}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <TestimonialsCarousel />
    </Stack>
  );
};

export default HomePage;
