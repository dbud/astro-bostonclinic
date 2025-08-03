import katex from "katex";

interface FormulaProps {
  latex: string;
  className?: string;
}

export default function Formula({ latex, className }: FormulaProps) {
  const html = katex.renderToString(latex, { throwOnError: false });
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
