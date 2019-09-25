# `<Fetch />`

## Props

### `maxAge`

The maximum __number of seconds__ since last resolved for a cached result to be
considered acceptable. The fetcher will always look in the cache first. If the
result is not found, or the last resolved timestamp is outside the maximum
allowed, the fetcher will refresh the result.
