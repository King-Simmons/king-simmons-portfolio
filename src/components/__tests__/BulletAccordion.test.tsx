import { ChakraProvider } from "@chakra-ui/react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import BulletAccordion from "../BulletAccordion";

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

const items = [
  { summary: "First summary", detail: "First detail" },
  { summary: "Second summary", detail: "Second detail" },
];

describe("BulletAccordion", () => {
  it("expands and collapses details", async () => {
    const user = userEvent.setup();
    renderWithChakra(<BulletAccordion items={items} />);

    const firstButton = screen.getByRole("button", {
      name: /First summary/i,
    });

    await act(async () => {
      await user.click(firstButton);
    });

    expect(firstButton).toHaveAttribute("aria-expanded", "true");

    await act(async () => {
      await user.click(firstButton);
    });

    expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  it("resets expanded items when the reset signal changes", async () => {
    const user = userEvent.setup();
    const { rerender } = renderWithChakra(
      <BulletAccordion items={items} resetSignal="full" />
    );

    await act(async () => {
      await user.click(
        screen.getByRole("button", { name: /Second summary/i })
      );
    });

    expect(
      screen.getByRole("button", { name: /Second summary/i })
    ).toHaveAttribute("aria-expanded", "true");

    rerender(
      <ChakraProvider>
        <BulletAccordion items={items} resetSignal="alternate" />
      </ChakraProvider>
    );

    expect(
      screen.getByRole("button", { name: /Second summary/i })
    ).toHaveAttribute("aria-expanded", "false");
  });
});
