import { render, screen } from "@testing-library/react";
import { Container } from "./index";

describe("Container", () => {
  it("renderiza los children correctamente", () => {
    render(
      <Container>
        <div data-testid="child">Contenido</div>
      </Container>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("aplica clases de contenedor", () => {
    render(
      <Container>
        <span>Test</span>
      </Container>
    );
    const container = screen.getByText("Test").parentElement;
    expect(container).toHaveClass("mx-auto", "px-4", "py-8");
  });
});
