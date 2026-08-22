# Poker MANIA ブログCMS セットアップ手順

このフォルダは、あなたのサイトを「管理画面（/admin）から記事を書ける」構成にしたものです。
既存のツール・講座・questページはそのまま含まれています。ブログ記事だけ、`content/posts/` の
Markdown（かんたんな文章形式）で管理し、公開時に自動でデザイン付きページに組み上がります。

--------------------------------------------------
## 全体の流れ（3ステップ）
--------------------------------------------------
A. このフォルダを GitHub に置く
B. Netlify を GitHub と連携（今後は「保存したら自動公開」になる）
C. ログイン設定（Netlify Identity）→ /admin で記事を書く

各ステップで詰まったら、画面に出ている内容をそのまま伝えてください。こちらで対応します。

--------------------------------------------------
## A. GitHub にアップロード
--------------------------------------------------
おすすめは「GitHub Desktop」アプリを使う方法です（一番かんたん）。

1. https://desktop.github.com/ から GitHub Desktop をインストールし、自分のGitHubでログイン
2. メニュー「File」→「Add Local Repository」→ このフォルダ（poker-mania-cms）を選ぶ
   →「create a repository」と出たら、それを押してリポジトリ化する
3. 左下「Publish repository」を押す
   - Name: poker-mania-site など
   - 「Keep this code private」はお好みで（private推奨）
   - Publish
これで GitHub 上にコードが上がります。

（GitHub Desktopを使わず、github.com で「New repository」→「uploading an existing file」から
 フォルダの中身をドラッグしてアップロードしてもOKです。ただし node_modules フォルダがある場合は
 アップロードしないでください。）

--------------------------------------------------
## B. Netlify を GitHub と連携
--------------------------------------------------
今は「フォルダをドラッグして公開」ですが、これを「GitHubと連携して自動公開」に切り替えます。
※ 独自ドメイン poker-mania.jp の設定は、今のNetlifyサイトに紐づいています。既存サイトを
   置き換える形にすると、ドメインもそのまま使えます。

【新しいサイトとして連携する場合】
1. Netlify にログイン →「Add new site」→「Import an existing project」
2. GitHub を選び、さきほどの poker-mania-site リポジトリを選ぶ
3. Build settings は自動で入ります（netlify.toml に設定済み）
   - Build command: `npm run build`
   - Publish directory: `_site`
4. 「Deploy」
5. うまく表示されたら、独自ドメイン poker-mania.jp を「古いサイト」から「この新しいサイト」へ
   付け替えます（Netlifyの Domain settings）。※ここは私が画面を見ながら案内します。

--------------------------------------------------
## C. ログイン設定（記事を書けるようにする）
--------------------------------------------------
1. Netlify の対象サイト →「Integrations」または「Identity」から **Identity を有効化（Enable Identity）**
2. Identity →「Services」→ **Git Gateway を有効化（Enable Git Gateway）**
3. Identity →「Invite users」で自分のメールアドレスを招待 → 届いたメールから登録（パスワード設定）
4. ブラウザで `https://poker-mania.jp/admin/` を開く → ログイン
5. 「ブログ記事」→「New 記事」で記事作成。画像はドラッグ＆ドロップ。
   スラッグ（URL用の英字。例: korea）を入れて「Publish」→ 数分で自動公開されます。

※ もし Netlify の画面に「Identity」が見当たらない場合は、その旨を伝えてください。
   別のログイン方式（GitHub認証）に切り替える手順を用意します。

--------------------------------------------------
## 記事の書き方（/admin）
--------------------------------------------------
- タイトル / スラッグ（URL用の英字）/ 公開日 / タグ / 説明 / 本文 を入力
- 本文は見たまま編集（太字・見出し・リスト・リンク・画像）。画像はドラッグで挿入
- 「Publish」を押すと GitHub に保存 → Netlify が自動でビルド＆公開
- 公開後の修正も、一覧から記事を開いて直して「Publish」するだけ

--------------------------------------------------
## 開発メモ（技術者向け）
--------------------------------------------------
- 静的サイトジェネレータ: Eleventy(11ty) v2
- `static/` … 既存の手書きHTML等をそのまま公開（ツール/講座/quest等）
- `content/posts/*.md` … ブログ記事（CMSが編集）
- `_includes/post.njk` … 記事レイアウト（白×深緑）
- `content/blog.njk` … ブログ一覧（記事から自動生成）
- `content/sitemap.njk` … sitemap.xml（記事を自動で追加）
- `static/admin/` … Decap CMS（管理画面）
- ローカル確認: `npm install` → `npm run build`（`_site/` に出力）
