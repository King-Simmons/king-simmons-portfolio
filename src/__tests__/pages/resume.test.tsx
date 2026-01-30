import { ChakraProvider } from "@chakra-ui/react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import ResumePage from "../../pages/resume";

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

  it("toggles between full views with alternate bullet copy", async () => {
    const user = userEvent.setup();
    renderWithChakra(<ResumePage />);

    expect(
      screen.getByRole("heading", { name: /Experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Reframed onboarding to improve activation by 18% through rapid prototyping and research/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /8\+ years shaping consumer and enterprise digital products/i,
      })
    ).toBeInTheDocument();

    const impactButton = screen.getByRole("button", {
      name: /Reframed onboarding to improve activation by 18% through rapid prototyping and research/i,
    });

    await act(async () => {
      await user.click(impactButton);
    });

    expect(impactButton).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(
        /Mapped the first-session flow, validated concepts with 15\+ interviews, and iterated weekly/i
      )
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
      screen.getByRole("button", {
        name: /8\+ years guiding consumer and enterprise digital product teams/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Redesigned onboarding to lift activation by 18% through rapid prototyping and research/i,
      })
    ).toBeInTheDocument();
    const altImpactButton = screen.getByRole("button", {
      name: /Redesigned onboarding to lift activation by 18% through rapid prototyping and research/i,
    });

    expect(altImpactButton).toHaveAttribute("aria-expanded", "false");
  });
});
