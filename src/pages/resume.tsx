import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import resumeData from "../data/resume.json";

const ResumePage = () => {
  const [view, setView] = useState<"snapshot" | "full">("full");
  const downloads = useMemo(
    () => resumeData.downloads ?? [],
    []
  );
  const showFullView = view === "full";

  return (
    <Stack spacing={8}>
      <Stack spacing={4}>
        <Stack spacing={3}>
          <Heading as="h1" size="xl">
            Resume
          </Heading>
          <Text color="gray.600" fontSize="lg">
            {resumeData.summary}
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
        >
          <ButtonGroup isAttached variant="outline">
            <Button
              onClick={() => setView("snapshot")}
              isActive={view === "snapshot"}
            >
              Snapshot view
            </Button>
            <Button
              onClick={() => setView("full")}
              isActive={view === "full"}
            >
              Full view
            </Button>
          </ButtonGroup>
          <HStack spacing={3}>
            {downloads.map((link) => (
              <Button
                as="a"
                key={link.label}
                href={link.href}
                download
                colorScheme="teal"
                variant="outline"
              >
                Download {link.label}
              </Button>
            ))}
          </HStack>
        </Stack>
      </Stack>

      <Box>
        <Heading as="h2" size="md" mb={3}>
          Highlights
        </Heading>
        <List spacing={2} color="gray.600">
          {highlights.map((item) => (
            <ListItem key={item}>• {item}</ListItem>
          ))}
        </List>
      </Box>

      {showFullView ? (
        <>
          <Box>
            <Heading as="h2" size="md" mb={4}>
              Experience
            </Heading>
            <Stack spacing={6}>
              {resumeData.experience.map((role) => (
                <Box key={`${role.company}-${role.role}`}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    justify="space-between"
                    spacing={1}
                  >
                    <Heading as="h3" size="sm">
                      {role.role} · {role.company}
                    </Heading>
                    <Text color="gray.500" fontSize="sm">
                      {role.period}
                    </Text>
                  </Stack>
                  <List spacing={2} mt={3} color="gray.600">
                    {role.impact.map((item) => (
                      <ListItem key={item}>• {item}</ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Stack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading as="h2" size="md" mb={3}>
                Skills
              </Heading>
              <Wrap>
                {resumeData.skills.map((skill) => (
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
        </>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <Heading as="h2" size="md" mb={3}>
              Core skills
            </Heading>
            <Wrap>
              {resumeData.skills.map((skill) => (
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
      )}
    </Stack>
  );
};

export default ResumePage;
