import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./index";

// Mock de createPortal para que renderice directamente
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

// Mock del icono
jest.mock("../icons", () => ({
  CloseIcon: ({ className }: { className: string }) => (
    <span data-testid="close-icon" className={className}>✕</span>
  ),
}));

describe("Modal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Contenido del modal</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("no renderiza cuando isOpen es false", () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renderiza cuando isOpen es true", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renderiza el contenido", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
  });

  it("renderiza el título cuando se proporciona", () => {
    render(<Modal {...defaultProps} title="Mi Modal" />);
    expect(screen.getByText("Mi Modal")).toBeInTheDocument();
  });

  it("muestra botón de cerrar por defecto", () => {
    render(<Modal {...defaultProps} title="Test" />);
    expect(screen.getByLabelText("Cerrar")).toBeInTheDocument();
  });

  it("oculta botón de cerrar cuando showCloseButton es false", () => {
    render(<Modal {...defaultProps} showCloseButton={false} />);
    expect(screen.queryByLabelText("Cerrar")).not.toBeInTheDocument();
  });

  it("llama onClose al hacer clic en botón cerrar", () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} title="Test" onClose={onClose} />);
    
    fireEvent.click(screen.getByLabelText("Cerrar"));
    expect(onClose).toHaveBeenCalled();
  });

  it("cierra al hacer clic en el overlay", () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    const overlay = document.querySelector(".bg-black\\/50");
    fireEvent.click(overlay!);
    expect(onClose).toHaveBeenCalled();
  });

  it("no cierra en overlay cuando closeOnOverlayClick es false", () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />);
    
    const overlay = document.querySelector(".bg-black\\/50");
    fireEvent.click(overlay!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("cierra con tecla Escape", () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("no cierra con Escape cuando closeOnEsc es false", () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnEsc={false} />);
    
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("renderiza footer cuando se proporciona", () => {
    render(
      <Modal {...defaultProps} footer={<button>Aceptar</button>} />
    );
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
  });

  it("aplica clase de tamaño correcta", () => {
    render(<Modal {...defaultProps} size="lg" />);
    const modalContainer = document.querySelector(".max-w-lg");
    expect(modalContainer).toBeInTheDocument();
  });
});
