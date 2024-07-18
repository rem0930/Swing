# Swing

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
<ul>
  <li>JWTを用いた認証システムにより、ユーザー認証を強化し、不正アクセスを防止します。</li>
  <li>プレースホルダーを使用したSQLクエリの実行を活用してSQLインジェクション防止</li>
  <li>トランザクションを使用しています。</li>
  <li>HTTPS（SSL/TLS）プロトコルを使用して、クライアントとサーバー間のデータ通信を暗号化しています。</li>
  <li>ボリュームを使用してデータベースの永続化をしました。</li>
</ul>
</details>

<details>
<summary>CI/CD関連</summary>
<ul>
  <li>継続的インテグレーション（CI）パイプラインにより、コード変更ごとに自動テストとビルドを行い、品質を確保しています。</li>
  <li>継続的デリバリー（CD）パイプラインを通じて、ステージングおよび本番環境へのデプロイを自動化し、リリースプロセスを効率化しています。</li>
</ul>
</details>
  
<details>
<summary>その他</summary>
<ul>
  <li>チーム開発を意識したプルリクエストの書き方を工夫してみました。</li>
  <li><img src="https://github.com/user-attachments/assets/daee629c-a264-4ea5-a2fd-e7e0d40defce" alt="スクリーンショット 2024-07-17 14 16 57" style="width:100%; max-width:800px;"></li>
</ul>
</details>  

## 機能

### メインページ
<table style="width:100%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e9be126d-5568-49fd-9082-dcc19adef471" alt="スクリーンショット 2024-07-15 10 04 36" style="width:100%; max-width:800px;"></td>
    <td><img src="https://github.com/user-attachments/assets/d96c80ac-8b47-4526-8c67-d1d237e8e176" alt="スクリーンショット 2024-07-15 10 06 45" style="width:100%; max-width:800px;"></td>
  </tr>
  <tr>
    <td>ユーザーが必要な情報を一目で確認できるよう、一覧表示に工夫を凝らしました。</td>
    <td>レスポンシブデザインではフィルターとハンバーガーメニューを作成しました。</td>
  </tr>
</table>

### フィルタリング
<table style="width:100%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6108610e-cf97-488a-8ff2-3469b99014c7" alt="スクリーンショット 2024-07-15 10 13 12" style="width:100%; max-width:600px;"></td>
    <td><img src="https://github.com/user-attachments/assets/697d3811-2261-4629-9a6d-44cd680f7cae" alt="スクリーンショット 2024-07-15 10 20 15" style="width:100%; max-width:600px;"></td>
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
    <td>ログイン認証が必要な作業を行なった場合、ログインモーダルが出てページを離れずにスムーズにログイン操作を行えるようにしました。</td>
    <td>新規登録後にプロフィール画像を設定できるようにしました。スキップすると名前に応じたアバターが表示されます。</td>
  </tr>
</table>

### チーム管理
<table style="width:100%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/31d02306-9111-43df-be88-523539faeb0a" alt="スクリーンショット 2024-07-15 10 48 00" style="width:100%; max-width:700px;"></td>
    <td><img src="https://github.com/user-attachments/assets/bc86ee06-9e37-494b-8a24-1cab2f606289" alt="スクリーンショット 2024-07-15 11 22 55" style="width:100%; max-width:700px;"></td>
  </tr>
  <tr>
    <td>ヘッダーにある人が二人いるみたいなアイコンを押します。チームを所持しているかいないかで現れるページが違います。チームも所持していなければチーム作成画面に遷移します。ここでもプロフィール画像を設定できます。</td>
    <td>チームを所持していればチーム管理画面に遷移します。ここででは作成した募集が見やすくなっています。チームプロフィールの編集もできます。</td>
  </tr>
</table>

### 募集の作成と管理
<table style="width:100%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/1b6b507d-342e-49ec-89fd-fe6ab5c99524" alt="スクリーンショット 2024-07-15 10 56 07" style="width:100%; max-width:206px;"></td>
    <td><img src="https://github.com/user-attachments/assets/f697c828-ac19-4c9d-a009-d581bb0ebba8" alt="スクリーンショット 2024-07-15 11 13 55" style="width:100%; max-width:1236px;"></td>
  </tr>
  <tr>
    <td>少しわかりにくいのでカーソルを合わせると募集作成　と表示されます。ログインしていないユーザーが押すとログインモーダルが現れ、チームを持っていないユーザーが押すとチーム作成画面が表示されます。</td>
    <td>募集を作成し、参加者を募集することができます。募集タイトル、詳細、日時、場所を設定して最後に確認画面があります。場所に関してはジオコーディング APIを使用しています。この写真の例だと大田スタジアムと打ったらこの住所に変えてくれました。</td>
  </tr>
</table>

### 募集詳細
<table style="width:100%;">
  <tr>
    <td><img src="https://github.com/user-attachments/assets/57374bfd-d98b-46ec-beea-9e8b47af6444" alt="スクリーンショット 2024-07-15 11 16 37" style="width:100%; max-width:1226px;"></td>
    <td><img src="https://github.com/user-attachments/assets/8dee9b0a-aa37-4af7-8d8a-8d42584695ff" alt="スクリーンショット 2024-07-15 11 03 04" style="width:100%; max-width:1242px;"></td>
  </tr>
  <tr>
    <td>興味のある募集に応募し、参加することができます。参加者は募集詳細ページから簡単に応募できます。位置情報を地図上に表示することで、ユーザーが直感的に場所を確認できるようにしました。</td>
    <td>このページでは応募、保存した募集が確認しやすくなっています。 簡単にプロフィールを編集することもできます。</td>
  </tr>
</table>

## インフラ構成図
<img src="https://github.com/user-attachments/assets/755bc285-f51d-48e9-8714-a10ef6a8da11" alt="スクリーンショット 2024-07-15 6 50 31" style="width:100%; max-width:762px;">

## 使用技術
| Category         | Technology Stack                                                                 |
|------------------|----------------------------------------------------------------------------------|
| Frontend         | React (18-alpine),　Next.js, Node.js, Chakra UI                                 　  |
| Backend          | Ruby (3.2), Ruby on Rails (7)                                              |
| Infrastructure   | Amazon Web Services                                                              |
| Database         | MySQL (8.0)                                                                      |
| Environment      | Docker , Docker Compose, Docker Hub                                                  |
| CI/CD            | GitHub Actions                                                                   |              
| Test             | Rubocop, Rspec, ESLint                                                           |
| Etc.             | GitHub, Nginx, Redis                                                             |

## 今後の予定
- [ ] チャット機能の追加
- [ ] 通知機能の追加
- [ ] Cookieの導入
- [ ] デプロイ戦略(ブルーグリーンデプロイ など)
