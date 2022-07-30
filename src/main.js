const core = require('@actions/core');
const { PubSub } = require('@google-cloud/pubsub');

async function main() {
  const projectId = core.getInput('project_id', { required: true });
  const topicName = core.getInput('topic_name', { required: true });
  const message = core.getInput('message', { required: true });
  const encoding = core.getInput('encoding');
  const data = Buffer.from(message, encoding);

  const client = new PubSub({ projectId });
  const topic = await client.topic(topicName);
  await topic.publishMessage({ data });
  console.info('Message published');
  await client.close();
}

main().catch((err) => {
  console.error(err);
  core.setFailed(err.message);
});
