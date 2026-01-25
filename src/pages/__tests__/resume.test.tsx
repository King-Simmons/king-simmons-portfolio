import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import ResumePage from "../resume";

const renderWithChakra = (ui: ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("ResumePage", () => {
  it("renders summary content and download links from JSON", () => {
    renderWithChakra(<ResumePage />);

    expect(
      screen.getByText(
        /Product designer and front-end developer specializing in experience-led product strategy/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Download PDF/i })
    ).toHaveAttribute("href", "/King-Simmons-Resume.pdf");
    expect(
      screen.getByRole("link", { name: /Download DOCX/i })
    ).toHaveAttribute("href", "/King-Simmons-Resume.docx");
  });

  it("toggles between snapshot and full views", async () => {
    const user = userEvent.setup();
    renderWithChakra(<ResumePage />);

    expect(
      screen.getByRole("heading", { name: /Experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Reframed onboarding to improve activation by 18% through rapid prototyping and research/i
      )
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Snapshot view/i }));

    expect(
      screen.getByRole("heading", { name: /Experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Redesigned onboarding to lift activation by 18% through rapid prototyping and research/i
      )
    ).toBeInTheDocument();
  });
});
