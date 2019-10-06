/* @flow */
/* eslint-disable react/jsx-props-no-spreading */

/*
 * Adapted from:
 * https://github.com/system-ui/theme-ui/tree/master/packages/sidenav
 */

import * as React from "react";
import { Box, Flex } from "rebass";
import Link from "./Link";

const removeSlash = str => (str.length > 1 ? str.replace(/\/$/, "") : str);

const flattenLinks = children =>
  React.Children.toArray(children).reduce((acc, child) => {
    if (child.props && child.props.mdxType === "a") {
      return [...acc, child];
    }
    if (!child.props || !child.props.children) return acc;
    return React.Children.toArray([
      ...acc,
      ...flattenLinks(child.props.children)
    ]);
  }, []);

type Props = {
  children: React.Node,
  pathname: string
};

const Pager = ({ children, pathname }: Props) => {
  const links = flattenLinks(children);
  const index = links.findIndex(
    link => link.props.href === removeSlash(pathname)
  );
  const hasPagination = index > -1;
  const previous = links[index - 1];
  const next = links[index + 1];

  return (
    <Flex alignItems="center" justifyContent="space-between" mt={5} py={4}>
      {hasPagination && previous && (
        <Box textAlign="left">
          <Box color="muted">Previous</Box>
          <Link variant="buttons.floating" {...previous.props} />
        </Box>
      )}
      {hasPagination && next && (
        <Box textAlign="right">
          <Box color="muted">Next</Box>
          <Link variant="buttons.floating" {...next.props} />
        </Box>
      )}
    </Flex>
  );
};

export default Pager;
