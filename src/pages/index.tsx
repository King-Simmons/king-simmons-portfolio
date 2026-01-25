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

const HomePage = () => {
  return (
    <Stack spacing={10}>
      <Stack spacing={4} maxW="2xl">
        <Heading as="h1" size="2xl">
          Designing product experiences that feel effortless.
        </Heading>
        <Tag
          alignSelf="flex-start"
          colorScheme="teal"
          fontSize="sm"
          px={3}
          py={1}
        >
          Open for product design and front-end partnerships
        </Tag>
        <Text color="gray.600" fontSize="lg">
          I am King Simmons, a product designer and front-end developer focused
          on translating complex problems into intuitive digital experiences. I
          partner with teams to ship thoughtful, accessible, and data-informed
          work.
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
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {[
          {
            title: "Product Strategy",
            description:
              "Facilitating workshops and framing roadmaps that balance business goals with user needs.",
          },
          {
            title: "Design Systems",
            description:
              "Building component libraries that keep teams aligned and speed up delivery.",
          },
          {
            title: "Front-End Craft",
            description:
              "Shipping responsive interfaces that elevate performance, accessibility, and polish.",
          },
        ].map((item) => (
          <Box
            key={item.title}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            p={6}
            bg="white"
          >
            <Heading as="h2" size="md" mb={2}>
              {item.title}
            </Heading>
            <Text color="gray.600">{item.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <TestimonialsCarousel />
    </Stack>
  );
};

export default HomePage;
