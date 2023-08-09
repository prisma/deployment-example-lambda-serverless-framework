import { PrismaClient } from '@prisma/client';
import type { APIGatewayProxyEvent } from 'aws-lambda';

const prisma = new PrismaClient();

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const posts = await prisma.post.findMany();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ posts, input: event }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      // @ts-ignore
      body: JSON.stringify({ error: error.message, input: event }),
    }
  }
};
