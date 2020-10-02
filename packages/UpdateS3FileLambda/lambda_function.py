import json
import logging
import boto3
import os
from botocore.exceptions import ClientError
client = boto3.client('s3')

def lambda_handler(event, context):
    # TODO implement
    response = client.put_object(
        ACL='public-read',
        Body=event['body']['data'],
        Bucket=os.environ['S3_BUCKET'],
        Key="dashboards/documents/"+event['body']['file']
    )
    print(response)
    return response