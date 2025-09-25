import { MockApiService } from './MockApiService';
import { PrismaApiService } from './PrismaApiService';
import type { ApiService } from './apiService';

const DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE || 'mock';

export function getApiService(): ApiService {
  if (DATA_SOURCE === 'prisma') {
    return new PrismaApiService();
  }
  return new MockApiService();
}
