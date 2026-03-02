import SocialIconLink from "./components/SocialIconLink";
import { GitHubIcon, LinkedInIcon } from "./components/icons";

export default function App() {
  return (
    <main className="page">
      <section className="card" aria-label="Intro">
        <h1 className="title">Hi, I&apos;m Harun</h1>

        <p className="subtitle">
          Building things on the web. Based in SF.
          <br />
          Always learning.
        </p>

        <nav className="links" aria-label="Primary links">
          <a className="link" href="#writing">
            View my writing
          </a>
          <a className="link" href="#projects">
            Book Tracker
          </a>
        </nav>

        <div className="social" aria-label="Social links">
          <SocialIconLink
            href="https://github.com/"
            label="GitHub"
            icon={<GitHubIcon />}
          />
          <SocialIconLink
            href="https://www.linkedin.com/"
            label="LinkedIn"
            icon={<LinkedInIcon />}
          />
        </div>

        <a className="email" href="mailto:harun@example.com">
          harun[at]example[dot]com
        </a>
      </section>
    </main>
  );
}

