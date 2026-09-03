import EnterMark from "./EnterMark";
import AsciiPortrait from "./AsciiPortrait";

export default function HomePage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="home">
      <div className="stage">
        <AsciiPortrait />
      </div>

      <EnterMark to="/" direction="down" label="enter" onNavigate={onEnter} />
    </div>
  );
}
