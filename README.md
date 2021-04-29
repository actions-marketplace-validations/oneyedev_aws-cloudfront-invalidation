## Request Invalidation to AWS Cloudfront for Github Actions

Request Invalidation to AWS Cloudfront in a Github action flow

## Usage

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: <<YOUR_REGION>>
- name: Request Invalidation to AWS Cloudfront
  uses: oneyedev/aws-cloudfront-invalidation@v1
  with:
    distribution-id: <<YOUR_DISTRIBUTION_ID>>
    paths: |
      images*
      sounds/drum.mp3
```

## Inputs

```yaml
inputs:
  distribution-id:
    description: 'AWS Cloudfront Distribution Id to Invalidation'
    required: true
  paths:
    description: 'Invalidation Object Paths which is seperated with linebreak(\n)'
    required: false
    default: '*'
```
