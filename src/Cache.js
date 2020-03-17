/* @flow */

import * as React from "react";

import type { CacheProps, CacheState } from "./types";

const CacheContext = React.createContext<*>(null);

class Cache extends React.Component<CacheProps, CacheState> {
  static displayName = "Cache";

  static defaultProps = {
    map: new Map<*, *>()
  };

  static Consumer = CacheContext.Consumer;

  mounted: boolean;

  constructor(props: CacheProps) {
    super(props);
    /* eslint-disable react/no-unused-state */
    this.mounted = false;
    this.state = {
      has: this.has.bind(this),
      entries: this.entries.bind(this),
      values: this.values.bind(this),
      keys: this.keys.bind(this),
      get: this.get.bind(this),

      // NOTE: these methods trigger setState
      set: this.set.bind(this),
      delete: this.delete.bind(this),
      clear: this.clear.bind(this)
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  get(key: *) {
    const { map } = this.props;
    return map.get(key);
  }

  has(key: *) {
    const { map } = this.props;
    return map.has(key);
  }

  entries(): Array<*> {
    const { map } = this.props;
    return [...map.entries()];
  }

  values(): Array<*> {
    const { map } = this.props;
    return [...map.values()];
  }

  keys(): Array<*> {
    const { map } = this.props;
    return [...map.keys()];
  }

  // ---------
  // Actions that modify entries also trigger setState
  // in order to communicate context updates to consumers.

  set(key: *, value: *): Map<*, *> {
    const { map } = this.props;
    const result = map.set(key, value);
    this.touchState();
    return result;
  }

  delete(key: *): boolean {
    const { map } = this.props;
    const result = map.delete(key);
    // Only update state if the key being removed exists
    if (result) {
      this.touchState();
    }
    return result;
  }

  clear() {
    const { map } = this.props;
    map.clear();
    this.touchState();
  }

  touchState() {
    if (this.mounted) {
      this.setState(prevState => prevState);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <CacheContext.Provider value={this.state}>
        {children}
      </CacheContext.Provider>
    );
  }
}

export default Cache;
