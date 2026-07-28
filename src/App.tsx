import HomePage from "./HomePage";
import ProjectsPage from "./ProjectsPage";
import PostWildfireLandslidesPage from "./PostWildfireLandslidesPage";
import LegacyPage from "./LegacyPage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");

  if (path === "/projects") return <ProjectsPage />;
  if (path === "/postwildfirelandslides") return <PostWildfireLandslidesPage />;
  if (path === "/legacy") return <LegacyPage />;
  return <HomePage />;
}
