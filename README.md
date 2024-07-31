# Swing
<img src="https://github.com/user-attachments/assets/b12887c4-fbf0-4b48-a07e-a4567f139b24" alt="Swing Logo" >

## サービス URL
[https://swi-ng.com/](https://swi-ng.com/)

## サービス概要
Swing はユーザーがチームや募集を簡単に作成、管理、参加できるプラットフォームです。リアルタイムでのコミュニケーションや位置情報を活用した検索機能を提供します。

## サービスのきっかけ
このサービスを作ろうと思ったきっかけは、私自身が草野球をやりたいと思った時に、チームの探し方がわからなかったことです。草野球に参加したい気持ちはあっても、情報が限られていたり、参加方法がわからなかったりと、たくさんの障壁がありました。そこで、同じように感じている人々が気軽に草野球を楽しめるように、このプラットフォームを作ることを決意しました。

さらに、草野球をやっている人達も実は新しいメンバーを集めるのに苦労していることを知りました。このプラットフォームがあれば、参加希望者とチームが簡単に出会い、お互いにWin-Winの関係が築けると考えました。

## こだわった点
<details>
<summary>ユーザービリティとデザインの工夫</summary>
<br>
<ul>
  <li>ユーザーが必要な情報を一目で確認できるよう、一覧表示に工夫を凝らしました。</li>
  <li>ユーザーが自分の応募状況や保存した募集を簡単に把握できるようにデザインしました。</li>
  <li>テンプレートを使用することで、ユーザーがスムーズに募集を作成できるように配慮しました。</li>
  <li>位置情報を地図上に表示することで、ユーザーが直感的に場所を確認できるようにしました。</li>
  <li>カレンダーの日付を押せばその日に行われる募集を見ることができます。</li>
  <li>デスクトップ、タブレット、スマートフォンなど、どのデバイスでも快適に使用できるようにデザインしました。</li>
  <li>モーダルを使用したログイン画面により、ページを離れずにスムーズにログイン操作を行えるようにしました。</li>
</ul>
</details>

<details>
<summary>セキュリティ</summary>
<br>
<ul>
  <li>JWTを用いた認証システムにより、ユーザー認証を強化し、不正アクセスを防止します。</li>
  <li>プレースホルダーを使用したSQLクエリの実行を活用してSQLインジェクションを防止。</li>
  <li>トランザクションの管理を行い、データベース操作を一貫性のある単位として管理し、全ての操作が成功するか、全てが取り消されることを保証。</li>
  <li>HTTPS（SSL/TLS）プロトコルを使用して、クライアントとサーバー間のデータ通信を暗号化しています。</li>
  <li>ボリュームを使用してデータベースの永続化を実現。</li>
</ul>
</details>

<details>
<summary>CI/CD関連</summary>
<br>
<ul>
  <li>継続的インテグレーション（CI）パイプラインにより、コード変更ごとに自動テストとビルドを行い、品質を確保しています。</li>
  <li>継続的デリバリー（CD）パイプラインを通じて、ステージングおよび本番環境へのデプロイを自動化し、リリースプロセスを効率化しています。</li>
</ul>
</details>

<details>
<summary>その他</summary>
<br>
<ul>
  <li>チーム開発を意識したプルリクエストの書き方を工夫してみました。</li>
  <li><img src="https://github.com/user-attachments/assets/daee629c-a264-4ea5-a2fd-e7e0d40defce" alt="スクリーンショット 2024-07-17 14 16 57" style="width:100%; max-width:600px;"></li>
</ul>
</details>

## 機能

### メインページ
<table style="width:100%;">
  <tr>
    <td><img width="1256" alt="メインページ" src="https://github.com/user-attachments/assets/0d0940c7-daf1-46c4-ae14-8b2495a52273" alt="スクリーンショット 2024-07-15 10 04 36" style="width:100%; max-width:800px;"></td>
    <td><img width="494" alt="スクリーンショット 2024-07-25 16 29 48" src="https://github.com/user-attachments/assets/2ef981d6-e4d1-4a11-99ef-abf79d0f4d28" alt="スクリーンショット 2024-07-15 10 06 45" style="width:100%; max-width:800px;"></td>
  </tr>
  <tr>
    <td>ユーザーが必要な情報を一目で確認できるよう、一覧表示に工夫を凝らしました。</td>
    <td>レスポンシブデザインにも対応しています。</td>
  </tr>
</table>

### フィルタリング
<table style="width:100%;">
  <tr>
    <td><img width="1280" alt="スクリーンショット 2024-07-25 15 27 15" src="https://github.com/user-attachments/assets/518b59ff-c931-4c64-946c-01f501659db4" style="width:100%; max-width:600px;"></td>
    <td><img width="465" alt="スクリーンショット 2024-07-25 14 44 18" src="https://github.com/user-attachments/assets/0f6febe3-a7d1-4994-80fd-5a8fc8670f5d" style="width:100%; max-width:600px;"></td>
  </tr>
  <tr>
    <td>カレンダーでその日の募集を探すことができます。募集の種類も選択できます。チェックを入れれば募集中のみ表示することもできます。</td>
    <td>レスポンシブデザインではフィルターで同じようにフィルタリングできます。</td>
  </tr>
</table>

### ログインモーダル
<table style="width:100%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/29481261-38aa-4725-82d0-ba80d334e8ab" alt="スクリーンショット 2024-07-15 11 18 56" style="width:100%; max-width:800px;"></td>
    <td><img src="https://github.com/user-attachments/assets/22154ee1-6d82-4387-a711-503c12c986f4" alt="スクリーンショット 2024-07-15 10 43 56" style="width:100%; max-width:800px;"></td>
  </tr>
  <tr>
    <td>ログイン認証が必要な作業を行なった場合、ログインモーダルが出てページを離れずにスムーズにログイン操作を行えるようにしました。
        無効な形式のメールアドレス、短すぎるパスワードのバリーデーションも行っています。</td>
    <td>新規登録後にプロフィール画像を設定できるようにしました。スキップすると名前に応じたアバターが表示されます。</td>
  </tr>
</table>

### チーム管理
<table style="width:100%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/8e555ad0-009e-45a9-8806-7757f3cdc57d" style="width:100%; max-width:700px;"></td>
    <td><img width="1280" alt="チーム情報 2024-07-25 15 38 29" src="https://github.com/user-attachments/assets/ea237238-873e-4d29-a1da-bf9e0f1313a4" alt="スクリーンショット 2024-07-15 11 22 55" style="width:100%; max-width:700px;"></td>
  </tr>
  <tr>
    <td>ヘッダーにある人が二人いるみたいなアイコンを押します。チームを所持しているかいないかで現れるページが違います。チームも所持していなければチーム作成画面に遷移します。ここでもプロフィール画像を設定できます。</td>
    <td>チームを所持していればチーム管理画面に遷移します。ここででは作成した募集が見やすくなっています。チームプロフィールの編集もできます。</td>
  </tr>
</table>

### 募集の作成とテンプレート
<table style="width:100%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/1b6b507d-342e-49ec-89fd-fe6ab5c99524" alt="スクリーンショット 2024-07-15 10 56 07" style="width:100%; max-width:206px;"></td>
    <td><img src="https://github.com/user-attachments/assets/616b93ed-6ebd-4116-b479-a16686ac313e" alt="スクリーンショット 2024-07-15 10 56 07" style="width:100%; max-width:206px;"></td>
  </tr>
  <tr>
    <td>少しわかりにくいのでカーソルを合わせると募集作成　と表示されます。ログインしていないユーザーが押すとログインモーダルが現れ、チームを持っていないユーザーが押すとチーム作成画面が表示されます。</td>
    <td>募集作成用のテンプレートを用意しました！募集の種類に応じたテンプレートを使用することができます。文章を考えるのが面倒な人にとっては最高です。</td>
  </tr>
</table>

### 募集の確認とチーム編集
<table style="width:100%;">
  <tr>
    <td><img width="1252" alt="募集確認 2024-07-25 16 14 53" src="https://github.com/user-attachments/assets/73ea3658-3c7b-4c59-957c-db6580028d4c" style="width:100%; max-width:1236px;"></td>
    <td><img width="1255" alt="チーム編集 2024-07-25 15 38 50" src="https://github.com/user-attachments/assets/04690615-fddf-418f-b1bd-edaade81c7bf" style="width:100%; max-width:1236px;"></td>
  </tr>
  <tr>
    <td>募集を作成し、参加者を募集することができます。募集タイトル、詳細、日時、場所を設定して最後に確認画面があります。場所に関してはジオコーディング APIを使用しています。この写真の例だと大田スタジアムと打ったらこの住所に変えてくれました。</td>
    <td>このページではチーム情報を変更できます。もちろん権限のあるユーザーだけです。ユーザ情報変更のロジックも同じです。</td>
  </tr>
</table>

### 募集詳細
<table style="width:100%;">
  <tr>
    <td><img width="1280" alt="スクリーンショット 2024-07-25 15 05 08" src="https://github.com/user-attachments/assets/be013764-f975-4477-90a0-c8b8f4c5e050" style="width:100%; max-width:1226px;"></td>
    <td><img width="1255" alt="マイページ" src="https://github.com/user-attachments/assets/d793882c-9d7e-45dc-8cb4-b2b7eaecfc3d" alt="スクリーンショット 2024-07-15 11 03 04" style="width:100%; max-width:1242px;"></td>
  </tr>
  <tr>
    <td>興味のある募集に応募し、参加することができます。参加者は募集詳細ページから簡単に応募できます。位置情報を地図上に表示することで、ユーザーが直感的に場所を確認できるようにしました。</td>
    <td>このページでは応募、保存した募集が確認しやすくなっています。 簡単にプロフィールを編集することもできます。</td>
  </tr>
</table>

### リアルタイムチャット機能とバリデーション
<table style="width:100%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2f3400fa-56ca-4721-a23f-56913a1ef841"></td>
    <td><img src="https://github.com/user-attachments/assets/c3fb7a33-20c1-418f-adc5-5825e562adea"></td>
  </tr>
  <tr>
    <td>リアルタイムチャット機能を実装し、ユーザー間のコミュニケーションを円滑にしました。メッセージの送受信は即時に反映されます。</td>
    <td>入力内容のバリデーションを強化し、無効なメッセージや不適切な内容の送信を防止します。ユーザーエクスペリエンスの向上を図りました。</td>
  </tr>
</table>

## インフラ構成図
<img src="https://github.com/user-attachments/assets/755bc285-f51d-48e9-8714-a10ef6a8da11" alt="スクリーンショット 2024-07-15 6 50 31" style="width:100%; max-width:762px;">

## 使用技術や開発環境

| Category           | Technology                                    |
|--------------------|-----------------------------------------------|
| Frontend           | React, Next.js, Node.js (node:18.16.0-alpine) |
| Backend            | Ruby (3.2.4), Ruby on Rails (7.1.3.4)         |
| Database           | MySQL (8.0), Redis (7.2.5)                    |
| Development        | Docker (3.8), GitHub Actions (CI/CD)          |
| Authentication     | JWT                                           |
| Deployment         | AWS EC2, S3, CloudFront                       |
| Web Server         | Nginx (1.26.1)                                |
| Code Quality       | Rubocop, ESLint                               |
| Testing Tools      | Rspec                                         |
| Maps API           | Google Maps API (Geolocation and JavaScript)  |

## 今後の予定
- [ ] 通知機能の追加
- [ ] Cookieの導入
- [ ] デプロイ戦略(ブルーグリーンデプロイ など)
