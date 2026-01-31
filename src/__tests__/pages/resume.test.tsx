import { ChakraProvider } from "@chakra-ui/react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import ResumePage from "../../pages/resume";
import resumeData from "../../data/resume.json";

jest.mock("next/link", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: React.forwardRef(function Link(
      props: { href: string; children: any },
      ref: any
    ) {
      const { href, children } = props;
      return (
        <a ref={ref} href={href}>
          {children}
        </a>
      );
    }),
  };
});

jest.mock("framer-motion", () => {
  const React = require("react");
  const filterProps = (props: any) => {
    const {
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      ...rest
    } = props;
    return rest;
  };
  return {
    __esModule: true,
    motion: new Proxy(
      {},
      {
        get: () =>
          React.forwardRef(function MotionElement(props: any, ref: any) {
            return <div ref={ref} {...filterProps(props)} />;
          }),
      }
    ),
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

const renderWithChakra = (ui: ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("ResumePage", () => {
  it("renders summary content and download links from JSON", () => {
    renderWithChakra(<ResumePage />);

    expect(
      screen.getByText(resumeData.summary)
    ).toBeInTheDocument();
    resumeData.downloads.forEach((download) => {
      expect(
        screen.getByRole("link", { name: `Download ${download.label}` })
      ).toHaveAttribute("href", download.href);
    });
  });

  it("toggles between full views with alternate bullet copy", async () => {
    const user = userEvent.setup();
    renderWithChakra(<ResumePage />);

    expect(
      screen.getByRole("heading", { name: /Experience/i })
    ).toBeInTheDocument();
    const [highlight, altHighlight] = [
      resumeData.highlights[0],
      resumeData.highlightsAlt[0],
    ];
    const [impact, altImpact] = [
      resumeData.experience[0].impact[0],
      resumeData.experience[0].impactAlt[0],
    ];

    expect(
      screen.getByRole("button", { name: highlight.summary })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: impact.summary })
    ).toBeInTheDocument();

    const impactButton = screen.getByRole("button", { name: impact.summary });

    await act(async () => {
      await user.click(impactButton);
    });

    expect(impactButton).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(impact.detail)
    ).toBeInTheDocument();

    await act(async () => {
      await user.click(
        screen.getByRole("button", { name: /Full view \(alternate\)/i })
      );
    });

    expect(
      screen.getByRole("heading", { name: /Experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: altHighlight.summary })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: altImpact.summary })
    ).toBeInTheDocument();
    const altImpactButton = screen.getByRole("button", {
      name: altImpact.summary,
    });

    expect(altImpactButton).toHaveAttribute("aria-expanded", "false");
  });
});
