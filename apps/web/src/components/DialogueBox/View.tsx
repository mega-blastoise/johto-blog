import type { DialogueBoxProps } from "./types";

function DialogueBoxView({ children, className, speaker }: DialogueBoxProps) {
  return (
    <div className={className ? `dialogue-box ${className}` : "dialogue-box"}>
      {speaker ? <p className="dialogue-box__speaker">{speaker}</p> : null}
      <div className="dialogue-box__text">{children}</div>
      <span className="dialogue-box__next" aria-hidden="true" />
    </div>
  );
}

export default DialogueBoxView;
