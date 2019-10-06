/* @flow */
import * as React from "react";
import { Box, Flex } from "rebass";
import Link from "../components/Link";
import Rsrc from "../components/RsrcType";

const features = [
  {
    id: 1,
    heading: "Zero dependencies",
    content: `
        Now that we know who you are, I know who I am. I'm not a mistake! It all
        makes sense! In a comic, you know how you can tell who the
        arch-villain's going to be?
    `
  },
  {
    id: 2,
    heading: "Minimal API",
    content: `
        Now that we know who you are, I know who I am. I'm not a mistake! It all
        makes sense! In a comic, you know how you can tell who the
        arch-villain's going to be?
    `
  },
  {
    id: 3,
    heading: "Opt-in adoption",
    content: `
        Now that we know who you are, I know who I am. I'm not a mistake! It all
        makes sense! In a comic, you know how you can tell who the
        arch-villain's going to be?
    `
  }
];

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
      {features.map(feature => (
        <Box key={feature.id} px={4} width={[1, 1 / 3, 1 / 3]}>
          <h3>{feature.heading}</h3>
          <p>{feature.content}</p>
        </Box>
      ))}
    </Flex>
  </>
);
