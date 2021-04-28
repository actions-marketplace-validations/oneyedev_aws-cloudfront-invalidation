const { CloudFront } = require('aws-sdk')

class Options {
  constructor() {
    this.distributionId = ''
    this.paths = []
  }

  parse(arg) {
    this.distributionId = arg.distributionId
    this.paths = (arg.paths || '*')
      .split('\n')
      .map((p) => p.trim())
      .map((p) => (p.startsWith('/') ? p : '/' + p))
    return this
  }
}

module.exports = (arg) => {
  const options = new Options().parse(arg)
  if (!options.distributionId) throw new Error('No Distribution ID')
  const cloudfront = new CloudFront()
  return cloudfront
    .createInvalidation({
      DistributionId: options.distributionId,
      InvalidationBatch: {
        CallerReference: Math.floor(Date.now() / 10000).toString(),
        Paths: {
          Quantity: options.paths.length,
          Items: options.paths,
        },
      },
    })
    .promise()
}
