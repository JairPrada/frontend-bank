interface TitleProps {
  main: string;
  highlight?: string;
}

export function HeroTitle({ main, highlight }: TitleProps) {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
      {main}
      {highlight && (
        <>
          <br />
          <span className="text-lime-200">{highlight}</span>
        </>
      )}
    </h1>
  );
}
