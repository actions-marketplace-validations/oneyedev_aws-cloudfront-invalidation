const core = require('@actions/core')
const main = require('./src/main')

async function run() {
  try {
    const result = await main({
      distributionId: core.getInput('distribution-id'),
      paths: core.getInput('paths'),
    })
    core.info(`Request invalidation successfuly at ${result.Location}`)
    core.startGroup('Invalidation Paths')
    core.info(result.Invalidation.InvalidationBatch.Paths.Items.join('\n'))
    core.endGroup()
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
