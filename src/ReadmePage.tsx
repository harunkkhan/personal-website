import EnterMark from "./EnterMark";

/** harunkhan.org/readme — the post itself is still to be written. */
export default function ReadmePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="sheet">
      <div className="sheetBody" />
      <EnterMark to="/" direction="up" label="back to the directory" onNavigate={onBack} />
    </div>
  );
}
