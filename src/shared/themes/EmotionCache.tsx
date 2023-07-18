"use client";

import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import type {
  EmotionCache,
  Options as OptionsOfCreateCache,
} from "@emotion/cache";
import { iChildren } from "../interfaces";
import { useState } from "react";

interface iCacheProviderProps extends iChildren {
  value: EmotionCache;
}

interface iNextAppDirEmotionCacheProviderProps extends iChildren {
  options: Omit<OptionsOfCreateCache, "insertionPoint">;
  CacheProvider?: (props: iCacheProviderProps) => React.JSX.Element | null;
}

// This implementation is taken from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
export const NextAppDirEmotionCacheProvider = (
  props: iNextAppDirEmotionCacheProviderProps
) => {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    // eslint-disable-next-line no-restricted-syntax
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
