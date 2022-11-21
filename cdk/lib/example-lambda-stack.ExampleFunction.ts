import {
  S3Client,
  ListObjectsCommand,
} from '@aws-sdk/client-s3';

import type * as Lambda from 'aws-lambda';

const s3 = new S3Client({});

export const handler = async (event: Lambda.S3Event, context: Lambda.Context) => {
  console.log(JSON.stringify(event, undefined, 2));
  console.log(JSON.stringify(context, undefined, 2));

  event.Records.forEach((r) => console.log(`${r.eventName} ${r.s3.bucket.name} ${r.s3.object.key}`))

  const objects = await s3.send(new ListObjectsCommand({
    Bucket: process.env.BUCKET_NAME ?? 'example-bucket',
  }));

  console.log(`${objects.Name}`);

  objects.Contents?.forEach((v) => console.log(`${v.Key} ${v.Size}`));
}
