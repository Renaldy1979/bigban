export default interface ICacheProvider {
  save(key: string, value: unknown): Promise<void>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
}
