import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export type BulletItem = {
  summary: string;
  detail: string;
};

interface BulletAccordionProps {
  items: BulletItem[];
  resetSignal?: number | string;
}

const BulletAccordion = ({ items, resetSignal }: BulletAccordionProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);

  useEffect(() => {
    setExpandedIndex(-1);
  }, [resetSignal]);

  const handleChange = (index: number | number[]) => {
    if (Array.isArray(index)) {
      return;
    }

    setExpandedIndex(index);
  };

  return (
    <Stack spacing={2}>
      {items.map((item, index) => {
        const isExpanded = expandedIndex === index;
        const panelId = `bullet-panel-${index}`;

        return (
          <Box key={item.summary}>
            <Button
              onClick={() => handleChange(isExpanded ? -1 : index)}
              variant="ghost"
              px={0}
              justifyContent="space-between"
              width="100%"
              rightIcon={
                <Text
                  as="span"
                  fontSize="sm"
                  color="gray.500"
                  aria-hidden="true"
                >
                  {isExpanded ? "−" : "+"}
                </Text>
              }
              aria-expanded={isExpanded}
              aria-controls={panelId}
              _hover={{ bg: "transparent" }}
            >
              <Text fontWeight="semibold">• {item.summary}</Text>
            </Button>
            <Box
              id={panelId}
              role="region"
              hidden={!isExpanded}
              pl={4}
              pt={1}
            >
              <Text color="gray.600">{item.detail}</Text>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
};

export default BulletAccordion;
