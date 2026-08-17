import HarunKhanOrgPage from "./HarunKhanOrgPage";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "harunkhan.org";
  }, []);

  return (
    <main className="page">
      <div className="contentWrap">
        <HarunKhanOrgPage />
      </div>
    </main>
  );
}

