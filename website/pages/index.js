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
      <Box py={4} sx={{ maxWidth: "600px" }} fontSize={4} fontWeight="light">
        A collection of components designed to simplify fetch state in React.
      </Box>
      <Box>
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
    <Flex mx={-4} flexWrap="wrap">
      <Box px={4} width={[1, 1 / 3, 1 / 3]}>
        <Styled.h3>Zero dependencies</Styled.h3>
        <Styled.p>
          {`
            Rsrc is tiny. Weighing in at under 3k gzipped, it won't take up too
            many precious bits in your bundle. Even better, the code you write
            using it should have a minimal footprint as well. Since Resource
            components are composable, the associated presentational components
            are portable and reusable.
          `}
        </Styled.p>
      </Box>
      <Box px={4} width={[1, 1 / 3, 1 / 3]}>
        <Styled.h3>Minimal API</Styled.h3>
        <Styled.p>
          {`
            Rsrc doesn't have many opinions of its own. For the most part,
            it's a light-weight wrapper around common, battle-hardened APIs you
            probably already know and love - ES6 maps, fetch, and promises. The
            API encourages the colocation of fetching data along side the
            presentational components that depend on it.
          `}
        </Styled.p>
      </Box>
      <Box px={4} width={[1, 1 / 3, 1 / 3]}>
        <Styled.h3>Incremental adoption</Styled.h3>
        <Styled.p>
          {`
            Rsrc doesn't require an all-in transformation of your code base. No
            configuration or scaffolding is needed to get up and running, so the
            initial cost is low. More importantly, with less boilerplate
            compared to traditional flux approaches, the overall lines of code
            to maintain are reduced as well.
          `}
        </Styled.p>
      </Box>
    </Flex>
  </>
);
