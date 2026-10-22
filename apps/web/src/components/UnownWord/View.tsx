import { unownGlyphs } from "@/assets/johto-gbc/sprites";

import type { UnownWordProps } from "./types";

// Decorative only: the readable word always lives next to it in real text.
function UnownWordView({ word }: UnownWordProps) {
  return (
    <span className="unown-word" aria-hidden="true">
      {Array.from(word.toLowerCase()).map((letter, index) => {
        const glyph = unownGlyphs[letter];
        return glyph ? (
          <img
            alt=""
            className="unown-word__glyph"
            height={56}
            key={`${letter}-${index}`}
            src={glyph}
            width={56}
          />
        ) : (
          <span className="unown-word__space" key={`space-${index}`} />
        );
      })}
    </span>
  );
}

export default UnownWordView;
