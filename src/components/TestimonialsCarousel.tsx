import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const AUTOPLAY_INTERVAL_MS = 6000;

const TestimonialsCarousel = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        quote:
          "King helped our team translate a messy roadmap into a clean, customer-first experience.",
        name: "Avery Martinez",
        role: "Head of Product, Brightwave Labs",
      },
      {
        quote:
          "The new design system streamlined our releases and made collaboration feel effortless.",
        name: "Priya Shah",
        role: "Engineering Manager, Atlas Commerce",
      },
      {
        quote:
          "Thoughtful, fast, and user-centered—King consistently ships polished work.",
        name: "Jordan Lee",
        role: "Founder, Studio North",
      },
    ],
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion || !isPlaying) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [isPlaying, prefersReducedMotion, testimonials.length]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <Box
      as="section"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="xl"
      p={{ base: 6, md: 8 }}
      bg="white"
      aria-labelledby="testimonials-heading"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap={6}
      >
        <Stack spacing={4} flex="1">
          <Heading as="h2" size="lg" id="testimonials-heading">
            Testimonials
          </Heading>
          <Text fontSize="lg" color="gray.700" aria-live="polite" aria-atomic>
            “{activeTestimonial.quote}”
          </Text>
          <Stack spacing={1}>
            <Text fontWeight="bold">{activeTestimonial.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {activeTestimonial.role}
            </Text>
          </Stack>
        </Stack>
        <Stack spacing={4} align={{ base: "flex-start", md: "flex-end" }}>
          <Button
            onClick={() => setIsPlaying((prev) => !prev)}
            variant="outline"
            colorScheme="teal"
            alignSelf={{ base: "flex-start", md: "flex-end" }}
            aria-pressed={!isPlaying}
          >
            {isPlaying ? "Pause rotation" : "Resume rotation"}
          </Button>
          <HStack spacing={2} aria-label="Testimonial position">
            {testimonials.map((_, index) => (
              <Box
                key={`indicator-${index}`}
                width="8px"
                height="8px"
                borderRadius="full"
                bg={index === activeIndex ? "teal.500" : "gray.300"}
              />
            ))}
          </HStack>
          {prefersReducedMotion ? (
            <Text fontSize="xs" color="gray.500">
              Autoplay disabled to respect reduced motion preferences.
            </Text>
          ) : null}
        </Stack>
      </Flex>
    </Box>
  );
};

export default TestimonialsCarousel;
