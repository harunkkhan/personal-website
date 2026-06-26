import HarunKhanOrgPage from "./HarunKhanOrgPage";
import ProjectsPage from "./ProjectsPage";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "harunkhan.org";
  }, []);

  const path = window.location.pathname.replace(/\/+$/, "");
  const isProjects = path === "/projects";

  return (
    <main className="page">
      <div className="contentWrap">
        {isProjects ? <ProjectsPage /> : <HarunKhanOrgPage />}
      </div>
    </main>
  );
}

