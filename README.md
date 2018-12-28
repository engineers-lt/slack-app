# slack-app
ワークスペースにチャンネル追加、絵文字の追加、新メンバーの参加などのイベントがあったときの通知をしてくれるSlack App。
Netlifyでの動作を前提としています。


## 設定
### Netlifyにデプロイ
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/engineers-lt/slack-app)

1. 上のボタンからデプロイ。（netlify.tomlの内容を元にデプロイされます。）
2. NetlifyのFunctionsタブからevents.jsを選択。
3. ページ上部のURLをメモ。

### Slack App側の設定
1. https://api.slack.com/eapps よりアプリを登録。
2. Event Subscriptionsで`Enable Events`をONに、`Request URL`に先程メモしたURLを入力。
3. Event Subscriptions内の`Subscribe to Workspace Events`に`channel_changed`, `emoji_changed`, `team_join`を選択。
3. OAuth & PermissionsでPermissonに`chat:write:bot`を追加。
4. Installed Appでアプリをワークスペースにインストール。
5. インストールして得られた`OAuth Access Token`をメモ。

### Netlifyの環境変数を設定
1. 「Slack App側の設定」で得られたOAuth Access Tokenを`SLACK_TOKEN`として設定。
2. 再度デプロイをして動作確認。
