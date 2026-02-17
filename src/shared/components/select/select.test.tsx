import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./index";

const mockOptions = [
  { value: "1", label: "Opción 1" },
  { value: "2", label: "Opción 2" },
  { value: "3", label: "Opción 3", disabled: true },
];

describe("Select", () => {
  it("renderiza un select con opciones", () => {
    render(<Select options={mockOptions} />);
    
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Opción 1")).toBeInTheDocument();
    expect(screen.getByText("Opción 2")).toBeInTheDocument();
  });

  it("muestra el placeholder", () => {
    render(<Select options={mockOptions} placeholder="Elige una opción" />);
    expect(screen.getByText("Elige una opción")).toBeInTheDocument();
  });

  it("muestra el placeholder por defecto", () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByText("Seleccionar...")).toBeInTheDocument();
  });

  it("muestra el label cuando se proporciona", () => {
    render(<Select options={mockOptions} label="País" />);
    expect(screen.getByText("País")).toBeInTheDocument();
  });

  it("muestra mensaje de error", () => {
    render(<Select options={mockOptions} error="Selecciona una opción" />);
    expect(screen.getByText("Selecciona una opción")).toBeInTheDocument();
  });

  it("muestra texto de ayuda", () => {
    render(<Select options={mockOptions} helperText="Elige tu país" />);
    expect(screen.getByText("Elige tu país")).toBeInTheDocument();
  });

  it("maneja el cambio de valor", () => {
    const onChange = jest.fn();
    render(<Select options={mockOptions} onChange={onChange} />);
    
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2" } });
    
    expect(onChange).toHaveBeenCalledWith("2");
  });

  it("aplica estilos de deshabilitado", () => {
    render(<Select options={mockOptions} disabled />);
    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
    expect(select).toHaveClass("cursor-not-allowed");
  });

  it("rota el icono al enfocar", () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole("combobox");
    
    fireEvent.focus(select);
    // El icono SVG debería tener la clase rotate-180
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("rotate-180");
  });

  it("deshabilita opciones individuales", () => {
    render(<Select options={mockOptions} />);
    const disabledOption = screen.getByText("Opción 3");
    expect(disabledOption).toBeDisabled();
  });

  it("acepta ref correctamente", () => {
    const ref = { current: null };
    render(<Select ref={ref} options={mockOptions} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
