import { WebClient } from '@slack/client'
import Esa from 'esa-node'

const eventResponses = {
  'reaction_added': async (event, client) => {
    if (event.reaction !== 'esa') { return null }

    const res = await client.conversations.history({
      latest: event.item.ts,
      limit: 1,
      channel: event.item.channel,
      inclusive: true
    })
    const message = res.messages[0]

    const esa = new Esa(process.env.ESA_TOKEN, 'engineers')
    return await esa.createPost({
      name: `Log/Slack/${res.ts}`,
      body_md: message.text
    })
  },
  'emoji_changed': async (event, client) => {
    if (event.subtype !== "add") { return null }
    return client.chat.postMessage({
      channel: 'sandbox',
      text: `emoji_added: :${event.name}:`,
    })
  },
  'team_join': async (event, client) => {
    return client.chat.postMessage({
      channel: '自己紹介',
      text: `:new: user_added

<@${event.user.id}> さん、 エンジニアの登壇を応援する会の Slack へようこそ :smile:
自己紹介（おなまえ、成長したい領域、好きなもの、その他もあればその他の情報）をお願いします。
また、以下の参加ガイドをご確認ください :pray:

https:\/\/esa-pages.io\/p\/sharing\/10407\/posts\/320\/0bb2faf43a53b3226482.html`,
    })
  },
  'channel_created': async (event, client) => {
    return client.chat.postMessage({
      channel: 'feed',
      text: `channel_added: <#${event.channel.id}>
<@${event.user.id}> さん、 作成した channel の purpose の設定をお願いします :smile:
設定方法が不明の場合は、以下の help をご確認ください :pray:

https://get.slack.help/hc/ja/articles/201654083-Set-a-channel-topic-or-purpose`,
    })
  },
}

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const slackEvent = body.event
  console.log(JSON.stringify(body, null, 4))

  if (slackEvent && eventResponses[slackEvent.type]) {
    const webClient = new WebClient(process.env.SLACK_TOKEN)
    await eventResponses[slackEvent.type](slackEvent, webClient)
  }

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}
