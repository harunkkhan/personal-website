import type { MouseEvent, ReactNode } from "react";
import { pageKey, sectionKey, type Row as RowData, type Section } from "./content";

export type Open = (to: string, flipKey?: string) => void;

/**
 * A link that stays on the site: still a real anchor, so modifier- and
 * middle-clicks fall through to the browser, but a plain click hands the path
 * to the app so it swaps views instead of reloading. `flipKey` names the text
 * that carries across the swap; `flipTarget` marks this element as the thing
 * that carries, which rows leave to their label instead.
 */
export function InternalLink({
  to,
  onOpen,
  className,
  flipKey,
  flipTarget = true,
  children,
}: {
  to: string;
  onOpen: Open;
  className?: string;
  flipKey?: string;
  flipTarget?: boolean;
  children: ReactNode;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onOpen(to, flipKey);
  };
  return (
    <a
      className={className}
      href={to}
      onClick={handleClick}
      data-flip={flipTarget ? flipKey : undefined}
    >
      {children}
    </a>
  );
}

function Row({ row, onOpen }: { row: RowData; onOpen: Open }) {
  const { label, href, icon: Mark } = row;
  const internal = href?.startsWith("/") ?? false;
  const key = internal ? pageKey(href!) : undefined;

  /* the label is its own element so hovering underlines the words and leaves
     the mark alone — and so the carried text is measured off the words, not
     the full-width row they sit in */
  const body = (
    <>
      <span className="dirLabel" data-flip={key}>
        {label}
      </span>
      <Mark className="dirIcon" />
    </>
  );

  if (!href) return <span className="dirRow">{body}</span>;

  if (internal) {
    return (
      <InternalLink className="dirRow" to={href} onOpen={onOpen} flipKey={key} flipTarget={false}>
        {body}
      </InternalLink>
    );
  }

  const external = href.startsWith("mailto:")
    ? {}
    : { target: "_blank", rel: "noopener noreferrer" };
  return (
    <a className="dirRow" href={href} {...external}>
      {body}
    </a>
  );
}

export default function Column({ section, onOpen }: { section: Section; onOpen: Open }) {
  const Mark = section.icon;
  return (
    <section className="dirCol" aria-label={section.title}>
      <h2 className="dirHead">
        {/* the title and its mark are one link, so clicking either opens the
            section and hovering anywhere on the row rules under the words */}
        <InternalLink
          className="dirHeadLink"
          to={`/${section.id}`}
          onOpen={onOpen}
          flipKey={sectionKey(section.id)}
          flipTarget={false}
        >
          <span className="dirLabel" data-flip={sectionKey(section.id)}>
            {section.title}
          </span>
          <Mark className="dirIcon" />
        </InternalLink>
      </h2>
      <div className="dirRows">
        {section.rows.map((row) => (
          <Row key={row.label} row={row} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
