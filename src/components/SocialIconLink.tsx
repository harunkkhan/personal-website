import type { ReactNode } from "react";

type Props = {
  href: string;
  label: string;
  icon: ReactNode;
};

export default function SocialIconLink({ href, label, icon }: Props) {
  return (
    <a
      className="iconLink"
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
    >
      {icon}
      <span className="iconLabel">{label}</span>
    </a>
  );
}

