/* @flow */
import * as React from "react";
import { Box, Flex } from "rebass";
import { Styled } from "theme-ui";
import Link from "../components/Link";
import Rsrc from "../components/RsrcType";

export default () => (
  <>
    <Box mt={4} mb={5}>
      <Rsrc width={244} />
      <Box
        my={4}
        style={{
          maxWidth: "600px",
          fontSize: "32px",
          lineHeight: "44px",
          fontWeight: "200"
        }}
      >
        A collection of components designed to simplify fetch state in React
      </Box>
      <Box pt={24}>
        <Styled.div
          as={Link}
          sx={{
            variant: "buttons.primary"
          }}
          href="/docs/getting-started/introduction"
        >
          Get started
        </Styled.div>
        <Styled.div
          as={Link}
          sx={{
            variant: "buttons.outline",
            ml: "16px"
          }}
          href="https://github.com/signalsciences/rsrc"
        >
          Github
        </Styled.div>
      </Box>
    </Box>
    <Flex mx={[0, 0, -4]} flexWrap="wrap">
      <Box px={[0, 0, 4]} width={[1, 1, 1 / 3]}>
        <Styled.h3>Zero dependencies</Styled.h3>
        <Box
          style={{
            fontSize: "16px",
            lineHeight: "26px",
            fontWeight: "400",
            letterSpacing: "-0.6px"
          }}
        >
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
        <Box
          style={{
            fontSize: "16px",
            lineHeight: "26px",
            fontWeight: "400",
            letterSpacing: "-0.6px"
          }}
        >
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
        <Box
          style={{
            fontSize: "16px",
            lineHeight: "26px",
            fontWeight: "400",
            letterSpacing: "-0.6px"
          }}
        >
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
