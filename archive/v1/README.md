# v1 — the serif site

The site as it stood before the letter-portrait redesign: white background,
EB Garamond, a short bio with inline links. The `work` / `post-wildfire
landslides` pages have since been removed, along with the images and PDF they
referenced.

The same commit is also preserved in git, which is the better way back:

```sh
git switch v1-legacy      # branch pinned at the last v1 commit
git show v1-legacy         # ...or just look at the tag
```

To restore it wholesale:

```sh
cp -R archive/v1/src archive/v1/index.html .
```
