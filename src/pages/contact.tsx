import {
  Box,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

const contactCards = [
  {
    label: "Email",
    value: "kd3business@gmail.com",
    href: "/contact",
    description: "Best for business inquiries and open roles.",
  },
  {
    label: "LinkedIn",
    value: "/in/kingsimmons/",
    href: "https://www.linkedin.com/in/kingsimmons/",
    description: "Best for open roles and tech chats.",
  }
];

const ContactPage = () => {
  return (
    <Stack spacing={6}>
      <Stack spacing={2} maxW="2xl">
        <Heading as="h1" size="lg">
          Let&apos;s connect
        </Heading>
        <Text color="gray.600">
          Whether you have open roles or want to talk about new tech,
          I&apos;m happy to chat. Choose the channel that works best for
          you.
        </Text>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {contactCards.map((card) => (
          <Box
            key={card.label}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            p={6}
            bg="white"
          >
            <Text fontSize="sm" color="gray.500" textTransform="uppercase">
              {card.label}
            </Text>
            <Link
              href={card.href}
              color="teal.500"
              fontWeight="semibold"
              fontSize="lg"
              isExternal
            >
              {card.value}
            </Link>
            <Text mt={2} color="gray.600">
              {card.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default ContactPage;
