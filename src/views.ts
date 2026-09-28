let views: Promise<number> | undefined;

export function loadViews() {
  views ??= fetch("/api/views", { method: "POST" })
    .then((res) => {
      if (!res.ok) throw new Error(`views request failed: ${res.status}`);
      return res.json() as Promise<{ views: number }>;
    })
    .then((data) => data.views);
  return views;
}
