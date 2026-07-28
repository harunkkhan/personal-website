# v1 — the serif site

A verbatim copy of the site as it stood before the letter-portrait redesign:
white background, EB Garamond, a short bio with inline links, and the `work` /
`post-wildfire landslides` pages.

The same commit is also preserved in git, which is the better way back:

```sh
git switch v1-legacy      # branch pinned at the last v1 commit
git show v1-legacy         # ...or just look at the tag
```

To restore it wholesale:

```sh
cp -R archive/v1/src archive/v1/index.html .
```

Note that `public/` was untouched by the redesign, so the images and PDF the old
pages referenced are all still in place.
