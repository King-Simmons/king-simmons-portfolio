import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import HomePage from "../../pages/index";

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

jest.mock("../../components/TestimonialsCarousel", () => ({
  __esModule: true,
  default: () => <div>Testimonials carousel</div>,
}));

const renderWithChakra = (ui: ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("HomePage", () => {
  it("renders the hero messaging and availability tag", () => {
    renderWithChakra(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /Designing product experiences that feel effortless/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Open for product design and front-end partnerships/i)
    ).toBeInTheDocument();
  });

  it("renders primary calls to action", () => {
    renderWithChakra(<HomePage />);

    expect(
      screen.getByRole("link", { name: /View Resume/i })
    ).toHaveAttribute("href", "/resume");
    expect(
      screen.getByRole("link", { name: /Let's Connect/i })
    ).toHaveAttribute("href", "/contact");
  });

  it("includes the testimonials carousel section", () => {
    renderWithChakra(<HomePage />);

    expect(screen.getByText(/Testimonials carousel/i)).toBeInTheDocument();
  });
});
