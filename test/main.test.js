require('dotenv').config()
const main = require('../src/main')

describe('Main Flow Test', () => {
  test('default param test', async () => {
    // when
    const result = await main({
      distributionId: process.env.DISTRIBUTION_ID,
    })

    // then
    expect(result.Location).toBeTruthy()
    expect(result.Invalidation.InvalidationBatch.Paths.Items).toHaveLength(1)
    expect(result.Invalidation.InvalidationBatch.Paths.Items[0]).toBe('/*')
  }, 10000)

  test('paths param test', async () => {
    // when
    const result = await main({
      distributionId: process.env.DISTRIBUTION_ID,
      paths: 'images/*\nsounds/drum.mp3',
    })

    // then
    expect(result.Location).toBeTruthy()
    expect(result.Invalidation.InvalidationBatch.Paths.Items).toHaveLength(2)
    expect(result.Invalidation.InvalidationBatch.Paths.Items).toEqual(
      expect.arrayContaining(['/images/*', '/sounds/drum.mp3'])
    )
  }, 10000)

  test('required param test', async () => {
    // when
    try {
      await main({
        distributionId: '',
      })
      fail('catching failed')
    } catch (error) {
      expect(error).toHaveProperty('message', 'No Distribution ID')
    }
  })
})
