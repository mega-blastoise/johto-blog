import { memo, useCallback, useEffect, useState } from "react";

import { pipeline } from "@/utils/pipeline";

import DecklistView from "./View";

import type { CopyState, DecklistProps } from "./types";

function Decklist(props: DecklistProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const { decklist } = props;

  const onCopy = useCallback(() => {
    // The Clipboard API is missing outside secure contexts (plain-http previews).
    if (!navigator.clipboard) {
      setCopyState("failed");
      return;
    }
    navigator.clipboard
      .writeText(decklist.export)
      .then(() => setCopyState("copied"))
      .catch(() => setCopyState("failed"));
  }, [decklist.export]);

  useEffect(() => {
    if (copyState !== "copied") return;
    const timer = window.setTimeout(() => setCopyState("idle"), 2400);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  return <DecklistView {...props} copyState={copyState} onCopy={onCopy} />;
}

export default pipeline(memo)(Decklist);
