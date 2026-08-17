/**
 * The site as it was before the letter-portrait redesign, kept reachable at
 * /legacy, unlinked from the home page. The markup is the original from
 * archive/v1 minus the projects link; the only additions are a way back and a
 * wrapper carrying the old light styling, scoped under `.legacy` so it can't
 * leak into the dark theme.
 */
export default function LegacyPage() {
  return (
    <div className="legacy">
      <section className="frontPage" aria-label="harunkhan.org, previous version">
        <p className="legacyBack">
          <a href="/">← back to harunkhan.org</a>
        </p>

        <p>
          hey, i'm harun. i'm currently building operational superintelligence at{" "}
          <a href="https://www.haladir.com/" target="_blank" rel="noopener noreferrer">
            haladir
          </a>
          .
        </p>

        <p>before haladir, i:</p>

        <ul className="frontPageBullets">
          <li>
            worked on statistical inference at the{" "}
            <a href="https://www.sec.gov/" target="_blank" rel="noopener noreferrer">
              us securities and exchange commission (sec)
            </a>
          </li>
          <li>
            worked on software for low latency tanks at{" "}
            <a href="https://www.leidos.com/" target="_blank" rel="noopener noreferrer">
              leidos
            </a>
          </li>
        </ul>

        <p>
          based in sf and nova (dc area). feel free to reach out at{" "}
          <a href="mailto:harunkkhan1@gmail.com">harunkkhan1 [at] gmail [dot] com</a>.
        </p>

        <p className="frontPageFooter">
          <a
            href="https://www.linkedin.com/in/harun-k-khan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>{" "}
          |{" "}
          <a href="https://github.com/harunkkhan" target="_blank" rel="noopener noreferrer">
            github
          </a>{" "}
          |{" "}
          <a href="https://x.com/harunkanwalkhan" target="_blank" rel="noopener noreferrer">
            x.com
          </a>{" "}
          |{" "}
          <a href="https://substack.com/@harunkhan" target="_blank" rel="noopener noreferrer">
            substack
          </a>
        </p>
      </section>
    </div>
  );
}
