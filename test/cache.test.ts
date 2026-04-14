import { describe, it, expect, vi } from "vitest";
import { createCache } from "../src/cache";

describe("createCache", () => {
  it("creates a cache with default Map store", () => {
    const cache = createCache();
    expect(cache.has("foo")).toBe(false);
  });

  it("stores and retrieves entries", () => {
    const cache = createCache();
    const entry = { value: Promise.resolve("hello") };
    cache.set("foo", entry);
    expect(cache.has("foo")).toBe(true);
    expect(cache.get("foo")).toBe(entry);
  });

  it("deletes entries", () => {
    const cache = createCache();
    cache.set("foo", { value: Promise.resolve("hello") });
    cache.delete("foo");
    expect(cache.has("foo")).toBe(false);
  });

  it("iterates keys", () => {
    const cache = createCache();
    cache.set("a", { value: Promise.resolve(1) });
    cache.set("b", { value: Promise.resolve(2) });
    expect([...cache.keys()]).toEqual(["a", "b"]);
  });

  it("accepts a custom store", () => {
    const store = new Map<string, any>();
    const cache = createCache({ store });
    cache.set("foo", { value: Promise.resolve("bar") });
    expect(store.has("foo")).toBe(true);
  });

  it("notifies subscribers on set", () => {
    const cache = createCache();
    const listener = vi.fn();
    cache.subscribe(listener);
    cache.set("foo", { value: Promise.resolve("bar") });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("notifies subscribers on delete", () => {
    const cache = createCache();
    const listener = vi.fn();
    cache.set("foo", { value: Promise.resolve("bar") });
    cache.subscribe(listener);
    cache.delete("foo");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("does not notify after unsubscribe", () => {
    const cache = createCache();
    const listener = vi.fn();
    const unsub = cache.subscribe(listener);
    unsub();
    cache.set("foo", { value: Promise.resolve("bar") });
    expect(listener).not.toHaveBeenCalled();
  });

  it("invalidateByKeyBase deletes all entries matching a prefix", () => {
    const cache = createCache();
    cache.set("/workspaces/1/rules", { value: Promise.resolve([]) });
    cache.set('/workspaces/1/rules::{"page":1}', { value: Promise.resolve([]) });
    cache.set('/workspaces/1/rules::{"page":2}', { value: Promise.resolve([]) });
    cache.set("/workspaces/2/rules", { value: Promise.resolve([]) });

    cache.invalidateByKeyBase("/workspaces/1/rules");

    expect(cache.has("/workspaces/1/rules")).toBe(false);
    expect(cache.has('/workspaces/1/rules::{"page":1}')).toBe(false);
    expect(cache.has('/workspaces/1/rules::{"page":2}')).toBe(false);
    expect(cache.has("/workspaces/2/rules")).toBe(true);
  });

  it("invalidateByKeyBase notifies once", () => {
    const cache = createCache();
    cache.set("/a", { value: Promise.resolve(1) });
    cache.set("/a::q1", { value: Promise.resolve(2) });
    const listener = vi.fn();
    cache.subscribe(listener);
    cache.invalidateByKeyBase("/a");
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
