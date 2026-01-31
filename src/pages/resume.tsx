import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import BulletAccordion from "../components/BulletAccordion";
import resumeData from "../data/resume.json";

const ResumePage = () => {
  const [view, setView] = useState<"full" | "fullAlt">("full");
  const downloads = useMemo(() => resumeData.downloads ?? [], []);
  const highlights =
    view === "full"
      ? resumeData.highlights ?? []
      : resumeData.highlightsAlt ?? resumeData.highlights ?? [];
  const summary =
    view === "full"
      ? resumeData.summary
      : resumeData.summaryAlt ?? resumeData.summary;
  const skills =
    view === "full"
      ? resumeData.skills ?? []
      : resumeData.skillsAlt ?? resumeData.skills ?? [];

  return (
    <Stack spacing={8}>
      <Stack spacing={4}>
        <Stack spacing={3}>
          <Heading as="h1" size="xl">
            Resume
          </Heading>
          <Text color="gray.600" fontSize="lg">
            {summary}
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
        >
          <ButtonGroup isAttached variant="outline" size="sm">
            <Button
              onClick={() => setView("full")}
              isActive={view === "full"}
            >
              Backend Systems Focused
            </Button>
            <Button
              onClick={() => setView("fullAlt")}
              isActive={view === "fullAlt"}
            >
              Product Focused
            </Button>
          </ButtonGroup>
          <HStack spacing={2}>
            {downloads.map((link) => (
              <Button
                as="a"
                key={link.label}
                href={link.href}
                download
                colorScheme="teal"
                variant="ghost"
                size="sm"
              >
                Download {link.label}
              </Button>
            ))}
          </HStack>
        </Stack>
      </Stack>

      <>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <Heading as="h2" size="md" mb={3}>
              Skills
            </Heading>
            <Wrap>
              {skills.map((skill) => (
                <WrapItem key={skill}>
                  <Tag colorScheme="teal">{skill}</Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Heading as="h2" size="md" mb={3}>
              Education
            </Heading>
            <Stack spacing={2}>
              {resumeData.education.map((entry) => (
                <Box key={entry.program}>
                  <Text fontWeight="semibold">{entry.program}</Text>
                  <Text color="gray.600">
                    {entry.school} · {entry.year}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </SimpleGrid>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            Experience
          </Heading>
          <Stack spacing={6}>
            {resumeData.experience.map((role) => {
              const impactItems =
                view === "full" ? role.impact : role.impactAlt ?? role.impact;

              const roleSummary =
                view === "full"
                  ? role.summary
                  : role.summaryAlt ?? role.summary;

              return (
                <Box key={`${role.company}-${role.role}`}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    justify="space-between"
                    spacing={1}
                  >
                    <Stack spacing={0}>
                      <Heading as="h3" size="sm">
                        {role.role}
                      </Heading>
                      <Text fontWeight="semibold" color="teal.600">
                        {role.company}
                      </Text>
                    </Stack>
                    <Text color="gray.500" fontSize="sm">
                      {role.period}
                    </Text>
                  </Stack>
                  {roleSummary ? (
                    <Text color="gray.600" mt={2}>
                      {roleSummary}
                    </Text>
                  ) : null}
                  <Box mt={3}>
                    <BulletAccordion
                      items={impactItems}
                      resetSignal={`${view}-${role.company}`}
                    />
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={3}>
            Highlights
          </Heading>
          <BulletAccordion items={highlights} resetSignal={view} />
        </Box>

        <HStack spacing={2} flexWrap="wrap">
          {downloads.map((link) => (
            <Button
              as="a"
              key={`bottom-${link.label}`}
              href={link.href}
              download
              colorScheme="teal"
              variant="ghost"
              size="sm"
            >
              Download {link.label}
            </Button>
          ))}
        </HStack>
      </>
    </Stack>
  );
};

export default ResumePage;
