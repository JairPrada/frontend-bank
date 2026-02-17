import Modal from "@/shared/components/modal";

interface DataTreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataTreatmentModal = ({ isOpen, onClose }: DataTreatmentModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tratamiento de Datos Personales"
      size="md"
    >
      <div className="space-y-4 text-gray-600">
        <p>
          En cumplimiento de la Ley de Protección de Datos Personales, le
          informamos que sus datos serán tratados de manera confidencial y
          segura.
        </p>

        <h3 className="font-semibold text-gray-800">
          Finalidad del tratamiento
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Procesamiento y evaluación de su solicitud financiera</li>
          <li>Verificación de identidad y prevención de fraude</li>
          <li>Comunicación sobre el estado de su solicitud</li>
          <li>Cumplimiento de obligaciones legales y regulatorias</li>
        </ul>

        <h3 className="font-semibold text-gray-800">Derechos del titular</h3>
        <p className="text-sm">
          Usted tiene derecho a conocer, actualizar, rectificar y solicitar la
          supresión de sus datos personales en cualquier momento.
        </p>

        <h3 className="font-semibold text-gray-800">Seguridad</h3>
        <p className="text-sm">
          Implementamos medidas de seguridad técnicas, administrativas y
          físicas para proteger sus datos contra acceso no autorizado, pérdida
          o alteración.
        </p>
      </div>
    </Modal>
  );
};
