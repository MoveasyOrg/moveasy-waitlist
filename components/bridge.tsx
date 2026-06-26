/**
 * Smooth color blend between two adjacent sections so the layout
 * doesn't cut hard from navy to paper and back.
 */
export function Bridge({
  from,
  to,
  height = 96,
}: {
  from: string;
  to: string;
  height?: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        height,
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      }}
    />
  );
}

export const COLORS = {
  navyDeep: "#060920",
  navyMid: "#0B123B",
  navy: "#1B2A8F",
  paper: "#FAFAF7",
} as const;
