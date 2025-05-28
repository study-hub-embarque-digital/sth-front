import { Box, Container, Typography } from "@mui/material";
import React from "react";

interface Section {
  title: string;
  content: React.ReactNode;
}

interface SectionGroupProps {
  sections: Section[];
  spacing?: number;
}

export default function SectionGroup({ sections, spacing = 4 }: Readonly<SectionGroupProps>) {
  return (
    <Container>
      {sections.map(({ title, content }, index) => (
        <Box key={`${index}-${title}`} mb={spacing}>
          {title && (
            <Typography variant="h6" fontWeight="bold" mb={2}>
              {title}
            </Typography>
          )}
          {content}
        </Box>
      ))}
    </Container>
  );
}
