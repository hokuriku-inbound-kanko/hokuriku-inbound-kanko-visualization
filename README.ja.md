# hokuriku-inbound-kanko-visualization

北陸インバウンド観光DXデータコンソーシアムが公開する観光調査データを可視化するNext.jsウェブアプリ。

[ライブアプリ](https://hokuriku-inbound-kanko.github.io/hokuriku-inbound-kanko-visualization/) (毎日午前6時JSTに更新)

## 機能

- **直近7日間データの14のインタラクティブなチャート**:
  - **訪問場所**: 都道府県、地域、施設
  - **人口統計**: 年齢層、性別
  - **国籍**と**日本への訪問回数**
  - **旅行・施設情報の取得元**
  - **訪問目的** (地域、都道府県、施設)
  - **施設評価**と**おすすめ評価**
- **/all ビュー**: 歴史的データの集計
- **/mygraph ビュー**: フィルタリングされたデータセットのカスタムグラフビルダー

## 技術スタック

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- ApexCharts によるデータ可視化
- Papaparse によるCSV解析
- pnpm によるパッケージ管理

## ローカル開発

```bash
pnpm install
pnpm dev
```

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。

## データソース

[hokuriku-gift-campaign](https://github.com/hokuriku-inbound-kanko/hokuriku-gift-campaign) リポジトリの毎日CSV調査データ。データは [welcome-hokuriku.jp](https://welcome-hokuriku.jp) から収集されています。

## デプロイ

GitHub Actions によるGitHub Pagesへの自動デプロイ。毎日午前6時JSTに更新されます。

## ライセンス

MIT License。詳細は [LICENSE](LICENSE) を参照してください。
