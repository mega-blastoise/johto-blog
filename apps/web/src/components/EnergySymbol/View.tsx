import type { EnergySymbolProps } from "./types";

// Decorative only: the symbol artwork is attached in styles.css so the bundler hashes it.
function EnergySymbolView({ size = "sm", type }: EnergySymbolProps) {
  return (
    <span
      aria-hidden="true"
      className={`energy energy--${type} energy--${size}`}
    />
  );
}

export default EnergySymbolView;
