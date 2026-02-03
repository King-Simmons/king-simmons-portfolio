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
          "I had the pleasure of working on the same team as King at Indeed for a little over a year. He is a strong team player with excellent communication skills, making collaboration both productive and enjoyable. King consistently demonstrated exceptional problem-solving and design abilities, often delivering creative and effective solutions to complex challenges.",
        name: "Hector Puga",
        role: "Software Engineer, Indeed",
      },
      {
        quote:
          "I am delighted to recommend King for any Software Engineering position. Throughout our time working together, King proved to be a highly engaged and capable teammate who consistently prioritized solving problems independently and effectively.",
        name: "Jay Pierson",
        role: "Engineering Manager, Indeed",
      },
      {
        quote:
          "King’s ability to quickly learn and apply a diverse set of languages, frameworks, and technologies across both front-end and back-end codebases is impressive. His versatility and willingness to tackle complex challenges make him a valuable asset to any team or organization.",
        name: "Former Colleague",
        role: "Manager, Indeed",
      },
      {
        quote:
          "I highly recommend King to any team seeking a talented, collaborative, and solutions-driven professional.",
        name: "Former Colleague",
        role: "Software Engineer, Indeed",
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
