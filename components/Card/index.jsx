import React from 'react';
import { Box, Image, Flex, Badge, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function Card({ anime }) {
  const router = useRouter();

  const handleAnimeDetail = (id) => {
    router.push(`detail/${id}`);
  };

  return (
    <Box
      width={200}
      cursor="pointer"
      onClick={() => handleAnimeDetail(anime.id)}
    >
      <Image borderRadius="md" src={anime.coverImage.large} />
      <Flex align="baseline" mt={2} gap={2} wrap="wrap">
        {anime.genres.length > 0 &&
          anime.genres.map((genre, idx) => (
            <Badge colorScheme="pink" key={idx}>
              {genre}
            </Badge>
          ))}
      </Flex>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {anime.title.romaji}
      </Text>
      <Flex mt={2} align="center">
        <Text ml={1} fontSize="sm">
          <b>{anime.averageScore}</b> ({anime.popularity})
        </Text>
      </Flex>
    </Box>
  );
}

export default Card;
