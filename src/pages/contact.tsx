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
    value: "hello@kingsimmons.design",
    href: "mailto:hello@kingsimmons.design",
    description: "Best for project inquiries and collaboration ideas.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/king-simmons",
    href: "https://linkedin.com/in/king-simmons",
    description: "Follow my product design case studies and updates.",
  },
  {
    label: "GitHub",
    value: "github.com/king-simmons",
    href: "https://github.com/king-simmons",
    description: "Browse my front-end experiments and open-source work.",
  },
];

const ContactPage = () => {
  return (
    <Stack spacing={6}>
      <Stack spacing={2} maxW="2xl">
        <Heading as="h1" size="lg">
          Let&apos;s connect
        </Heading>
        <Text color="gray.600">
          Whether you&apos;re exploring a new product direction or need design
          support, I&apos;m happy to chat. Choose the channel that works best for
          you and I&apos;ll follow up within two business days.
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
