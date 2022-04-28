import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import request from 'graphql-request';
import Image from 'next/image';
import React from 'react';
import Header from '../../components/Header';
import { uri } from '../../utils/uri';

function AnimeDetail({ anime }) {
  return (
    <>
      <Header />
      <Container py={10} maxW="container.lg">
        <Flex
          direction={{
            base: 'column',
            md: 'row',
          }}
        >
          <Box mx="auto" mb={12}>
            <Image src={anime.coverImage.large} width={215} height={300} />
          </Box>
          <Box maxW="container.sm">
            <Heading size="md">{anime.title.romaji}</Heading>
            <div dangerouslySetInnerHTML={{ __html: `${anime.description}` }} />
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default AnimeDetail;

export async function getServerSideProps({ params }) {
  const { id } = params;

  const variables = {
    id,
  };

  const getAnimeDetail = `
    query AnimeDetail($id: Int!) {
      Media(id: $id) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        type
        genres
        averageScore
        popularity
        description
      }
    }
  `;

  const data = await request(uri, getAnimeDetail, variables);
  const anime = data.Media;

  return {
    props: {
      anime,
    },
  };
}
