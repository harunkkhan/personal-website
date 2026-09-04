import Markdown, { type Components } from "react-markdown";
import { InternalLink, type Open } from "./Column";

/**
 * The written half of a page, kept as markdown in src/pages so the words live
 * apart from the markup. A blank line starts a new paragraph and a line of
 * three dashes is the rule that splits a page into sections; headings, lists
 * and emphasis come through as themselves.
 *
 * Links are the one construct that can't be left to the renderer: one pointing
 * at this site is handed to the app so it swaps views rather than reloading,
 * exactly as a directory row is, and one leaving opens in its own tab.
 */
export default function Prose({ source, onOpen }: { source: string; onOpen: Open }) {
  const components: Components = {
    a({ href, children }) {
      if (href?.startsWith("/")) {
        return (
          <InternalLink to={href} onOpen={onOpen}>
            {children}
          </InternalLink>
        );
      }
      const external = href?.startsWith("mailto:")
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" };
      return (
        <a href={href} {...external}>
          {children}
        </a>
      );
    },
  };

  return (
    <div className="prose">
      <Markdown components={components}>{source}</Markdown>
    </div>
  );
}
