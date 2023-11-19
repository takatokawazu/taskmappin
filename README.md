# [Task Mappin](https://taskmappin-c2989267e49d.herokuapp.com)

# Description
<p>
現場仕事がある社内向けのユーザー間の位置情報とタスクを共有することができるwebアプリケーション
</p>

# Usage
```bash
git clone https://github.com/takatokawazu/taskmappin.git
npm i
npm run start
cd client
npm i
npm run start
```

# 要件定義
## 目的
ユーザー間で位置情報とタスクを共有し、現場作業の効率を良くする。

## 開発経緯
父の経営する測量会社でアルバイトをした時、現場の仲間たちが位置情報とタスクの場所をうまく共有できていなかったので、作業が非常に非効率的だと感じました。その経験から、現場のメンバーがタスクの場所と位置情報を共有し、それをもとにタスクを効果的に割り振ることができれば、作業の効率が向上すると思いました。

## 工夫した点

## 機能要件
- ユーザー間で位置情報を共有
- ユーザー間のチャット機能
- タスクの場所を共有
- 管理画面から各ユーザーがタスクを確認することができる
  - 全てのタスク
  - ユーザーが完了したタスク
  - ユーザーが作ったタスク
  - 他のユーザーからアサインされたタスク
  - 未完了のタスク
  - 完了したタスク

## 非機能要件
- ビデオ通話機能
- slackなどのアプリと連携
  - タスクを完了した際の通知
  - 緊急メッセージの通知
  - OAuth
- excelなどのデータ形式からタスクをまとめて追加

# 設計

## 使用技術一覧

### フロントエンド
- 言語
  - javascript
- フレームワーク
  - React
  - Redux
- ライブラリ
  - socket.io-client

### バックエンド
- 言語
  - Node.js
- フレームワーク
  - express.js
- ライブラリ
  - socket.io
- データベース
  - MongoDB

### デプロイ環境
- heroku

## シーケンス図
```mermaid
sequenceDiagram
    participant ユーザー as User
    participant ブラウザ as Browser
    participant ローカルストレージ as LocalStorage
    participant クッキー as Cookie
    participant マップページ as MapPage
    participant 管理ページ as AdminPage
    participant データベース as MongoDB
    participant ソケット通信 as SocketIO

    Note over ユーザー,ブラウザ: 登録ページ
    ユーザー->>+ブラウザ: ユーザー情報を登録
    ブラウザ->>+クッキー: jwtTokenを保存
    ブラウザ->>+データベース: ユーザー情報を登録
    データベース-->>-ブラウザ: ユーザー登録済み

    Note over ユーザー,ブラウザ: ログインページ
    ユーザー->>+ブラウザ: 認証情報を入力
    ブラウザ->>+ローカルストレージ: ユーザー情報を保存
    ローカルストレージ-->>-ブラウザ: 情報を保存済み
    ブラウザ->>+クッキー: jwtTokenが存在するか確認
    クッキー-->>-ブラウザ: jwtTokenが存在する
    ブラウザ-->>マップページ: マップページへ遷移

    Note over ユーザー,マップページ: マップページ
    ユーザー->>+ソケット通信: ソケット通信をリクエスト
    ソケット通信-->>-ユーザー: ソケット通信を確立
    ユーザー->>+ブラウザ: geoLocation apiを使用し、位置情報を取得
    ブラウザ->>+ソケット通信: 位置情報をバックエンドへ
    ソケット通信-->>+ユーザー: 他のユーザーの位置情報を送信
    ユーザー->>+マップページ: マップ上に表示

    ユーザー->>+データベース: タスクの取得リクエスト
    データベース->>+ソケット通信: タスクをソケット通信
    ソケット通信-->>+ユーザー: タスクを取得
    ユーザー->>+マップページ: マップ上に表示

    ユーザー->>+マップページ: 緯度経度に基づいてタスクを追加
    マップページ->>+データベース: タスクを追加
    データベース->>+ソケット通信: タスクをソケット通信
    ソケット通信-->>+マップページ: タスクをmap上に表示

    ユーザー->>+マップページ: タスクを完了
    マップページ->>+データベース: タスクを完了
    データベース->>+ソケット通信: タスクをソケット通信
    ソケット通信-->>+マップページ: タスクをmapから見えないようにする

    ユーザー->>+マップページ: アサインされたタスクの通知を受け取る
    マップページ->>+ソケット通信: アサインされたタスクを通知
    ソケット通信-->>+マップページ: 通知を表示

    ユーザー->>+マップページ: チャット機能を使用
    マップページ->>+ソケット通信: チャットメッセージ
    ソケット通信-->>+ユーザー: メッセージを受信
    ユーザー->>+マップページ: チャットを表示

    Note over ユーザー,管理ページ: 管理ページ
    管理ページ->>+データベース: タスクを要求
    データベース-->>-管理ページ: タスクのリスト
```


## ER図
![MongoDB ER図](https://github.com/takatokawazu/taskmappin/blob/main/client/public/taskmappin_ER.png)

# 今後の目標

## 現状の課題

## 追加予定機能
