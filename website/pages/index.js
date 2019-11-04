/* @flow */
import * as React from "react";
import { Box, Flex } from "rebass";
import { Styled } from "theme-ui";
import Link from "../components/Link";
import Rsrc from "../components/RsrcType";

export default () => (
  <>
    <Box mt={4} mb={6}>
      <Rsrc width={244} />
      <Box
        mt={24}
        sx={{ maxWidth: "600px" }}
        fontSize={5}
        lineHeight={5}
        letterSpacing={5}
        fontWeight="light"
      >
        <p>
          A collection of components designed to simplify fetch state in React
        </p>
      </Box>
      <Box pt={24}>
        <Link
          variant="buttons.primary"
          href="/docs/getting-started/introduction"
        >
          Get started
        </Link>
        <Link
          variant="buttons.outline"
          ml={3}
          href="https://github.com/signalsciences/rsrc"
        >
          Github
        </Link>
      </Box>
    </Box>
    <Flex mx={[0, 0, -4]} flexWrap="wrap">
      <Box px={[0, 0, 4]} width={[1, 1, 1 / 3]}>
        <Styled.h3>Zero dependencies</Styled.h3>
        <Box fontSize={2} lineHeight={2} letterSpacing={2}>
          {`
            Rsrc is tiny. Weighing in at 7.5k (2.6k gzipped) means it won't
            take up too many precious bits in your bundle. With the exception
            of ensuring polyfills for your target environments and an optional
            LRU cache, there's no additional dependencies required for a
            production-ready setup.
          `}
        </Box>
      </Box>
      <Box px={[0, 0, 4]} width={[1, 1, 1 / 3]}>
        <Styled.h3>Minimal API</Styled.h3>
        <Box fontSize={2} lineHeight={2} letterSpacing={2}>
          {`
            Rsrc doesn't impose many opinions of its own. For the most part, it's
            a lightweight wrapper around common, battle-hardened APIs you
            probably already know and love - ES6 maps, fetch, and promises.
            The API encourages the colocation of data fetching alongside the
            presentational components that depend on it.
          `}
        </Box>
      </Box>
      <Box px={[0, 0, 4]} width={[1, 1, 1 / 3]}>
        <Styled.h3>Incremental adoption</Styled.h3>
        <Box fontSize={2} lineHeight={2} letterSpacing={2}>
          {`
            Rsrc doesn't require an all-in transformation of your codebase. No
            configuration or scaffolding is needed to get up and running, so the
            initial barrier is low. More importantly, with less boilerplate
            compared to traditional flux approaches, the overall lines of code
            to maintain are reduced as well.
          `}
        </Box>
      </Box>
    </Flex>
  </>
);
