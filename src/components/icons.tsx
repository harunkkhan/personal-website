type IconProps = {
  title?: string;
};

export function GitHubIcon({ title = "GitHub" }: IconProps) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.75 5.7.75 12.2c0 5.18 3.44 9.58 8.2 11.13.6.12.82-.27.82-.58v-2.16c-3.34.75-4.04-1.48-4.04-1.48-.55-1.44-1.35-1.82-1.35-1.82-1.1-.78.08-.76.08-.76 1.22.09 1.86 1.3 1.86 1.3 1.08 1.9 2.84 1.35 3.53 1.03.11-.8.42-1.35.77-1.66-2.66-.32-5.46-1.38-5.46-6.13 0-1.35.45-2.46 1.2-3.33-.12-.31-.52-1.57.11-3.27 0 0 .98-.32 3.2 1.27a10.5 10.5 0 0 1 2.91-.41c.99 0 1.99.14 2.91.41 2.22-1.6 3.2-1.27 3.2-1.27.63 1.7.23 2.96.11 3.27.75.87 1.2 1.98 1.2 3.33 0 4.76-2.8 5.8-5.47 6.12.43.39.82 1.17.82 2.36v3.5c0 .31.22.7.82.58 4.77-1.55 8.2-5.95 8.2-11.13C23.25 5.7 18.27.5 12 .5Z"
      />
    </svg>
  );
}

export function LinkedInIcon({ title = "LinkedIn" }: IconProps) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M4.98 3.5C3.88 3.5 3 4.4 3 5.5S3.88 7.5 4.98 7.5 7 6.6 7 5.5 6.08 3.5 4.98 3.5ZM3.5 8.98h3v11.52h-3V8.98Zm7 0h2.88v1.57h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.62 2.02 3.62 4.64v6.87h-3v-6.09c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21v6.2h-3V8.98Z"
      />
    </svg>
  );
}

export function InstagramIcon({ title = "Instagram" }: IconProps) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        ry="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function XIcon({ title = "X" }: IconProps) {
  return (
    <img
      src="/x-logo.png"
      alt={title}
      className="icon"
      width={18}
      height={18}
      loading="lazy"
    />
  );
}

export function EmailIcon({ title = "Email" }: IconProps) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        d="M3 7h18v12H3V7zM3 7l9 6 9-6"
      />
    </svg>
  );
}

