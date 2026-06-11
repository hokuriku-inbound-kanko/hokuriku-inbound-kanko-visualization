# hokuriku-inbound-kanko-visualization

日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A Next.js web app visualizing open tourism survey data from the Hokuriku Inbound Tourism DX Data Consortium.

[Live App](https://hokuriku-inbound-kanko.github.io/hokuriku-inbound-kanko-visualization/) (updated daily at 6 AM JST)

## Features

- **14 interactive charts** for recent 7-day data:
  - **Visited locations**: Prefecture, Area, Facility
  - **Demographics**: Age range, Gender
  - **Nationalities** and **number of visits to Japan**
  - **Trip/facility info sources**
  - **Purpose of visit** (Region, Prefecture, Facility)
  - **Facility evaluation** and **recommendation ratings**
- **/all view**: Historical data aggregation
- **/mygraph view**: Custom graph builder for filtered datasets

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- ApexCharts for data visualization
- Papaparse for CSV parsing
- pnpm for package management

## Local Development

```bash
pnpm install
pnpm dev
```

Runs the development server at [http://localhost:3000](http://localhost:3000).

## Data Source

Daily CSV survey data from the [hokuriku-gift-campaign](https://github.com/hokuriku-inbound-kanko/hokuriku-gift-campaign) repository, sourced from [welcome-hokuriku.jp](https://welcome-hokuriku.jp).

## Deployment

Automatically deployed to GitHub Pages via GitHub Actions. Updates daily at 6 AM JST.

## License

MIT License. See [LICENSE](LICENSE) for details.
