import HarunKhanOrgPage from "./HarunKhanOrgPage";
import ProjectsPage from "./ProjectsPage";
import PostWildfireLandslidesPage from "./PostWildfireLandslidesPage";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "harunkhan.org";
  }, []);

  const path = window.location.pathname.replace(/\/+$/, "");

  const renderPage = () => {
    if (path === "/projects") return <ProjectsPage />;
    if (path === "/postwildfirelandslides") return <PostWildfireLandslidesPage />;
    return <HarunKhanOrgPage />;
  };

  return (
    <main className="page">
      <div className="contentWrap">{renderPage()}</div>
    </main>
  );
}

