# Daily Prayer

A simple static website for Luther’s morning and evening prayers.

The site selects the prayer for the visitor’s local browser time.
It shows the morning prayer before noon and the evening prayer from noon onward.
The tappable time-of-day label toggles between the two prayers.
The page rechecks the browser time when it becomes visible again.

## Development

Serve the repository root with any static web server.
For example, run `python3 -m http.server 8000` and open `http://localhost:8000`.

Pico CSS and the Literata reading font are vendored in `vendor/`.
The site has no build step and does not require Alpine.js.

## Checks

The project uses mise to pin Node.js, Prettier, and actionlint.
Run `mise install` and `mise run check` before submitting changes.
Run `mise run fmt` to format the website source files.

## Publishing

The workflow in `.github/workflows/pages.yml` publishes the site to GitHub Pages after a push to `master`.
In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
The standard project-site address will be `https://nnutter.github.io/prayers/`.

## Source

The prayers are from [Luther’s Small Catechism](https://bookofconcord.org/small-catechism/).
