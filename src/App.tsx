import HomePage from "./HomePage";
import ProjectsPage from "./ProjectsPage";
import PostWildfireLandslidesPage from "./PostWildfireLandslidesPage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");

  if (path === "/projects") return <ProjectsPage />;
  if (path === "/postwildfirelandslides") return <PostWildfireLandslidesPage />;
  return <HomePage />;
}
