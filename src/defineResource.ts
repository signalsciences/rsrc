import type {
  ActionsConfig,
  ResourceDefinition,
  UseResourceReturn,
} from "./types";
import { useResourceInternal } from "./useResource";

interface DefineResourceConfig<TParams, TQueries, TData, TActions extends ActionsConfig<TParams>> {
  key: (params: TParams) => string;
  get: (params: TParams, queries?: TQueries) => Promise<TData>;
  maxAge?: number;
  actions?: TActions;
}

function buildCacheKey(key: string, queries?: Record<string, unknown>): string {
  if (!queries || Object.keys(queries).length === 0) return key;
  return `${key}::${JSON.stringify(queries)}`;
}

export function defineResource<
  TParams,
  TQueries = undefined,
  TData = unknown,
  TActions extends ActionsConfig<TParams> = Record<string, never>,
>(
  config: DefineResourceConfig<TParams, TQueries, TData, TActions>,
): ResourceDefinition<TParams, TQueries> &
  ((params: TParams, queries?: TQueries) => UseResourceReturn<TData, TActions>) {

  const knownKeyBases = new Set<string>();

  const hook = (params: TParams, queries?: TQueries): UseResourceReturn<TData, TActions> => {
    const keyBase = config.key(params);
    knownKeyBases.add(keyBase); // Track all key bases we've seen

    const cacheKey = buildCacheKey(keyBase, queries as Record<string, unknown> | undefined);

    return useResourceInternal<TData, TActions>({
      key: cacheKey,
      get: queries !== undefined
        ? () => config.get(params, queries)
        : () => config.get(params),
      maxAge: config.maxAge,
      actions: config.actions,
      actionParams: params,
    });
  };

  // Attach ResourceDefinition properties
  (hook as any).__brand = "rsrc_resource" as const;
  (hook as any).key = config.key;
  (hook as any).__keyBases = knownKeyBases;

  return hook as ResourceDefinition<TParams, TQueries> &
    ((params: TParams, queries?: TQueries) => UseResourceReturn<TData, TActions>);
}
