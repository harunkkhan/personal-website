import HomePage from "./HomePage";
import LegacyPage from "./LegacyPage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");

  if (path === "/legacy") return <LegacyPage />;
  return <HomePage />;
}
