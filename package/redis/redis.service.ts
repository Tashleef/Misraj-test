import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async get({ key }: { key: string }) {
    return await this.cacheManager.get(key);
  }

  async set({
    key,
    value,
    ttl,
  }: {
    key: string;
    value: unknown;
    ttl?: number;
  }) {
    return await this.cacheManager.set(key, value, ttl);
  }

  async del({ key }: { key: string }) {
    return await this.cacheManager.del(key);
  }
}
