import { render, screen, fireEvent } from "@testing-library/react";
import Autocomplete from "./index";
import type { AutocompleteOption } from "./autocomplete.types";

const mockOptions: AutocompleteOption[] = [
  { value: "bogota", label: "Bogotá" },
  { value: "medellin", label: "Medellín" },
  { value: "cali", label: "Cali" },
  { value: "barranquilla", label: "Barranquilla" },
];

describe("Autocomplete", () => {
  it("renderiza el input", () => {
    render(<Autocomplete options={mockOptions} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("muestra el placeholder", () => {
    render(<Autocomplete options={mockOptions} placeholder="Buscar ciudad..." />);
    expect(screen.getByPlaceholderText("Buscar ciudad...")).toBeInTheDocument();
  });

  it("muestra el label", () => {
    render(<Autocomplete options={mockOptions} label="Ciudad" />);
    expect(screen.getByText("Ciudad")).toBeInTheDocument();
  });

  it("muestra error", () => {
    render(<Autocomplete options={mockOptions} error="Campo requerido" />);
    expect(screen.getByText("Campo requerido")).toBeInTheDocument();
  });

  it("muestra helperText", () => {
    render(<Autocomplete options={mockOptions} helperText="Selecciona tu ciudad" />);
    expect(screen.getByText("Selecciona tu ciudad")).toBeInTheDocument();
  });

  it("abre el dropdown al enfocar", () => {
    render(<Autocomplete options={mockOptions} />);
    const input = screen.getByRole("combobox");
    
    fireEvent.focus(input);
    
    expect(screen.getByText("Bogotá")).toBeInTheDocument();
  });

  it("filtra opciones al escribir", () => {
    render(<Autocomplete options={mockOptions} />);
    const input = screen.getByRole("combobox");
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Med" } });
    
    expect(screen.getByText("Medellín")).toBeInTheDocument();
    expect(screen.queryByText("Bogotá")).not.toBeInTheDocument();
  });

  it("muestra texto de sin resultados", () => {
    render(<Autocomplete options={mockOptions} noOptionsText="No hay ciudades" />);
    const input = screen.getByRole("combobox");
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "xyz" } });
    
    expect(screen.getByText("No hay ciudades")).toBeInTheDocument();
  });

  it("selecciona opción al hacer clic", () => {
    const onSelect = jest.fn();
    render(<Autocomplete options={mockOptions} onSelect={onSelect} />);
    const input = screen.getByRole("combobox");
    
    fireEvent.focus(input);
    fireEvent.click(screen.getByText("Medellín"));
    
    expect(onSelect).toHaveBeenCalledWith({ value: "medellin", label: "Medellín" });
  });

  it("llama onChange al escribir", () => {
    const onChange = jest.fn();
    render(<Autocomplete options={mockOptions} onChange={onChange} />);
    const input = screen.getByRole("combobox");
    
    fireEvent.change(input, { target: { value: "Cal" } });
    
    expect(onChange).toHaveBeenCalledWith("Cal");
  });

  it("navega con teclas de flecha", () => {
    render(<Autocomplete options={mockOptions} />);
    const input = screen.getByRole("combobox");
    
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    
    // La navegación debería funcionar sin errores
    expect(input).toBeInTheDocument();
  });

  it("selecciona con Enter", () => {
    const onSelect = jest.fn();
    render(<Autocomplete options={mockOptions} onSelect={onSelect} />);
    const input = screen.getByRole("combobox");
    
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    
    expect(onSelect).toHaveBeenCalled();
  });

  it("cierra con Escape", () => {
    render(<Autocomplete options={mockOptions} />);
    const input = screen.getByRole("combobox");
    
    fireEvent.focus(input);
    expect(screen.getByText("Bogotá")).toBeInTheDocument();
    
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByText("Bogotá")).not.toBeInTheDocument();
  });

  it("maneja valor inicial", () => {
    render(<Autocomplete options={mockOptions} value="medellin" />);
    const input = screen.getByRole("combobox");
    
    // El valor debe estar presente
    expect(input).toHaveValue("medellin");
  });

  it("está deshabilitado cuando disabled es true", () => {
    render(<Autocomplete options={mockOptions} disabled />);
    const input = screen.getByRole("combobox");
    expect(input).toBeDisabled();
  });
});
