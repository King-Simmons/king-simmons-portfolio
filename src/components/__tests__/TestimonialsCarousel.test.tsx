import { ChakraProvider } from "@chakra-ui/react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import TestimonialsCarousel from "../TestimonialsCarousel";

const renderWithChakra = (ui: ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

const setMatchMedia = (prefersReducedMotion: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches:
        prefersReducedMotion && query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe("TestimonialsCarousel", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setMatchMedia(false);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders the first testimonial", () => {
    renderWithChakra(<TestimonialsCarousel />);

    expect(
      screen.getByText(
        /King helped our team translate a messy roadmap into a clean, customer-first experience./i
      )
    ).toBeInTheDocument();
  });

  it("autoplays testimonials when motion is allowed", () => {
    renderWithChakra(<TestimonialsCarousel />);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(
      screen.getByText(
        /The new design system streamlined our releases and made collaboration feel effortless./i
      )
    ).toBeInTheDocument();
  });

  it("pauses autoplay when toggled", () => {
    renderWithChakra(<TestimonialsCarousel />);

    fireEvent.click(screen.getByRole("button", { name: /pause rotation/i }));

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(
      screen.getByText(
        /King helped our team translate a messy roadmap into a clean, customer-first experience./i
      )
    ).toBeInTheDocument();
  });

  it("disables autoplay when prefers-reduced-motion is enabled", () => {
    setMatchMedia(true);
    renderWithChakra(<TestimonialsCarousel />);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(
      screen.getByText(
        /King helped our team translate a messy roadmap into a clean, customer-first experience./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Autoplay disabled to respect reduced motion preferences./i)
    ).toBeInTheDocument();
  });
});
