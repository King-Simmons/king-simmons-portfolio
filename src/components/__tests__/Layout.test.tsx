import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import Layout from "../Layout";

const renderWithChakra = (ui: ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe("Layout", () => {
  it("renders navigation links", () => {
    renderWithChakra(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Resume" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("renders children content", () => {
    renderWithChakra(
      <Layout>
        <div>Page content</div>
      </Layout>
    );

    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
