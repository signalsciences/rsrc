// ---- Cache types ----

export interface CacheEntry {
  value: Promise<unknown>;
  lastResolved?: number;
}

export interface CacheStore {
  get(key: string): CacheEntry | undefined;
  set(key: string, entry: CacheEntry): void;
  delete(key: string): void;
  keys(): IterableIterator<string>;
  has(key: string): boolean;
}

export interface Cache {
  get(key: string): CacheEntry | undefined;
  set(key: string, entry: CacheEntry): void;
  delete(key: string): void;
  keys(): IterableIterator<string>;
  has(key: string): boolean;
  subscribe(listener: () => void): () => void;
  notify(): void;
  invalidateByKeyBase(keyBase: string): void;
}

export interface CreateCacheOptions {
  store?: CacheStore;
}

// ---- Cache handle for custom invalidation functions ----

export interface CacheHandle {
  invalidate(resource: ResourceDefinition<any, any>, params?: Record<string, unknown>): void;
}

// ---- Resource definition marker ----

export interface ResourceDefinition<TParams, TQueries = undefined> {
  __brand: "rsrc_resource";
  key: (params: TParams) => string;
}

// ---- Action types ----

export type InvalidateTarget<TParams> =
  | ResourceDefinition<any, any>
  | ((params: TParams, cache: CacheHandle) => void);

export interface ActionConfig<TParams, TBody = void, TResponse = unknown, TMeta = unknown> {
  fn: (params: TParams, body: TBody) => Promise<TResponse>;
  invalidates?: InvalidateTarget<TParams>[];
  meta?: TMeta;
}

// ---- Resource config ----

export type ActionsConfig<TParams> = Record<string, ActionConfig<TParams, any, any, any>>;

export interface ResourceConfig<
  TParams,
  TQueries,
  TData,
  TActions extends ActionsConfig<TParams>,
  TMeta = unknown,
> {
  key: (params: TParams) => string;
  get: (params: TParams, queries?: TQueries) => Promise<TData>;
  maxAge?: number;
  actions?: TActions;
}

// ---- Inline resource config (useResource) ----

export interface InlineResourceConfig<TData, TActions extends ActionsConfig<void>> {
  key: string;
  get: () => Promise<TData>;
  maxAge?: number;
  actions?: TActions;
}

// ---- Hook return ----

export interface ResourceState<TData> {
  pending: boolean;
  fulfilled: boolean;
  rejected: boolean;
  value: TData | null;
  reason: Error | null;
}

export type MappedActions<TActions extends ActionsConfig<any>> = {
  [K in keyof TActions]: TActions[K] extends ActionConfig<any, infer TBody, infer TResponse, any>
    ? (body: TBody) => Promise<TResponse>
    : never;
};

export interface UseResourceReturn<TData, TActions extends ActionsConfig<any>> {
  state: ResourceState<TData>;
  actions: MappedActions<TActions>;
  refresh: () => void;
  invalidate: () => void;
}

// ---- Provider types ----

export interface CacheProviderProps {
  cache: Cache;
  onActionSuccess?: (meta: unknown, result: unknown) => void;
  onActionError?: (meta: unknown, error: Error) => void;
  children: React.ReactNode;
}
