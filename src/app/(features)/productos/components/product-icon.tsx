import Image from "next/image";

interface ProductIconProps {
  imageSrc: string;
  name: string;
  gradient: string;
}

export function ProductIcon({ imageSrc, name, gradient }: ProductIconProps) {
  return (
    <div
      className={`w-14 h-14 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 p-2`}
    >
      <Image
        src={imageSrc}
        alt={name}
        width={40}
        height={40}
        className="object-contain"
      />
    </div>
  );
}
