/**
 * Rate Limiting & Daily Counter Storage
 * 
 * Tracks anonymous daily story counters per user ID, per IP hash, and globally.
 * CRITICAL PRIVACY & ABUSE PROTECTION:
 * - Does NOT store story topics, generated texts, or vocabulary words.
 * - Stores ONLY integer counts and anonymized error aggregates.
 * - IP addresses are hashed using SHA-256 for privacy.
 * - Counters reset daily (UTC).
 * 
 * Free storage options & official limits:
 * 1. Node/Express Local File Storage: Free, persistent on persistent volumes or disk.
 * 2. Netlify Blobs: Free tier includes 100,000 read ops/month, 25,000 write ops/month, 5 GB storage.
 * 3. Cloudflare KV: Free tier includes 100,000 read ops/day, 1,000 write ops/day, 1 GB storage.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';

export interface DailyCounters {
  date: string; // YYYY-MM-DD
  globalCount: number;
  users: Record<string, number>;
  ips: Record<string, number>;
  errorCounts: Record<string, number>;
}

export function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip + '-lirefacile-salt').digest('hex').substring(0, 16);
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

class CounterStorage {
  private dataDir: string;
  private filePath: string;
  private cache: DailyCounters;

  constructor() {
    const isServerless = Boolean(
      process.env.NETLIFY ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.LAMBDA_TASK_ROOT ||
      process.env.VERCEL
    );
    this.dataDir = isServerless
      ? path.join(os.tmpdir(), 'lirefacile-data')
      : path.resolve(process.cwd(), 'data');
    this.filePath = path.join(this.dataDir, 'daily-counters.json');
    this.cache = this.loadFromDisk();
  }

  private initDay(dateStr: string): DailyCounters {
    return {
      date: dateStr,
      globalCount: 0,
      users: {},
      ips: {},
      errorCounts: {}
    };
  }

  private loadFromDisk(): DailyCounters {
    const today = getTodayDateString();
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && parsed.date === today) {
          return {
            date: today,
            globalCount: Number(parsed.globalCount) || 0,
            users: parsed.users && typeof parsed.users === 'object' ? parsed.users : {},
            ips: parsed.ips && typeof parsed.ips === 'object' ? parsed.ips : {},
            errorCounts: parsed.errorCounts && typeof parsed.errorCounts === 'object' ? parsed.errorCounts : {}
          };
        }
      }
    } catch (e) {
      console.warn('[Storage] Could not read daily counters from disk, starting fresh', e);
    }
    return this.initDay(today);
  }

  private saveToDisk(): void {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.cache, null, 2), 'utf-8');
    } catch (e) {
      console.error('[Storage] Error persisting daily counters to disk:', e);
    }
  }

  private ensureToday(): void {
    const today = getTodayDateString();
    if (this.cache.date !== today) {
      this.cache = this.initDay(today);
      this.saveToDisk();
    }
  }

  public getCounts(userId: string, ip: string): { userCount: number; ipCount: number; globalCount: number } {
    this.ensureToday();
    const ipHash = hashIp(ip);
    return {
      userCount: this.cache.users[userId] || 0,
      ipCount: this.cache.ips[ipHash] || 0,
      globalCount: this.cache.globalCount || 0
    };
  }

  public increment(userId: string, ip: string): { userCount: number; ipCount: number; globalCount: number } {
    this.ensureToday();
    const ipHash = hashIp(ip);

    this.cache.users[userId] = (this.cache.users[userId] || 0) + 1;
    this.cache.ips[ipHash] = (this.cache.ips[ipHash] || 0) + 1;
    this.cache.globalCount = (this.cache.globalCount || 0) + 1;

    this.saveToDisk();

    return {
      userCount: this.cache.users[userId],
      ipCount: this.cache.ips[ipHash],
      globalCount: this.cache.globalCount
    };
  }

  public recordError(errorType: string): void {
    this.ensureToday();
    const cleanType = String(errorType).replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 40);
    this.cache.errorCounts[cleanType] = (this.cache.errorCounts[cleanType] || 0) + 1;
    this.saveToDisk();
  }

  public getSummary(): { date: string; globalCount: number; totalUsers: number; errorSummary: Record<string, number> } {
    this.ensureToday();
    return {
      date: this.cache.date,
      globalCount: this.cache.globalCount,
      totalUsers: Object.keys(this.cache.users).length,
      errorSummary: { ...this.cache.errorCounts }
    };
  }
}

export const counterStorage = new CounterStorage();
