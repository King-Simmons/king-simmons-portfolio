import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
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
  return {
    __esModule: true,
    motion: new Proxy(
      {},
      {
        get: () =>
          React.forwardRef(function MotionElement(props: any, ref: any) {
            return <div ref={ref} {...props} />;
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

  it("toggles between snapshot and full views", async () => {
    const user = userEvent.setup();
    renderWithChakra(<ResumePage />);

    expect(
      screen.getByRole("heading", { name: /Experience/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Snapshot view/i }));

    expect(
      screen.queryByRole("heading", { name: /Experience/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Core skills/i })
    ).toBeInTheDocument();
  });
});
