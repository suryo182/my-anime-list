import { Box, Container, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { StyledLink } from './styles';

function Header() {
  return (
    <Box bg="blue.400" p={4}>
      <Container maxW="container.lg">
        <Flex justifyContent="flex-end" columnGap={4}>
          <Box cursor="pointer">
            <Link href="/">
              <StyledLink>Home</StyledLink>
            </Link>
          </Box>
          <Box cursor="pointer">
            <Link href="/collections">
              <StyledLink>My Collections</StyledLink>
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
