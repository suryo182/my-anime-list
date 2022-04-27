import { gql } from '@apollo/client';
import {
  Badge,
  Box,
  Container,
  Flex,
  Image,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { MdStar } from 'react-icons/md';
import client from '../apollo-client';
import Header from '../components/Header';

export default function Home({ data }) {
  const { trending, popular, allTime } = data;
  console.log({ trending });
  return (
    <>
      <Header />
      <Container py={10} maxW="container.lg">
        <Wrap justify="center">
          {trending.media.length > 0 &&
            trending.media.map((anime) => (
              <Box key={anime.id} width={200} cursor="pointer">
                <Image borderRadius="md" src={anime.coverImage.large} />
                <Flex align="baseline" mt={2} gap={2} wrap="wrap">
                  {anime.genres &&
                    anime.genres.map((genre, idx) => (
                      <Badge colorScheme="pink" id={idx}>
                        {genre}
                      </Badge>
                    ))}
                </Flex>
                <Text
                  mt={2}
                  fontSize="xl"
                  fontWeight="semibold"
                  lineHeight="short"
                >
                  {anime.title.romaji}
                </Text>
                <Flex mt={2} align="center">
                  <Text ml={1} fontSize="sm">
                    <b>{anime.averageScore}</b> ({anime.popularity})
                  </Text>
                </Flex>
              </Box>
            ))}
          <WrapItem p="5" maxW="320px" borderWidth="1px"></WrapItem>
        </Wrap>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query getAnime {
        trending: Page(page: 1, perPage: 10) {
          pageInfo {
            total
            perPage
          }
          media(seasonYear: 2022, status: RELEASING, sort: SCORE_DESC) {
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
          }
        }
        popular: Page(page: 1, perPage: 10) {
          pageInfo {
            total
            perPage
          }
          media(
            season: SPRING
            status: RELEASING
            seasonYear: 2022
            popularity_greater: 40000
            sort: SCORE_DESC
          ) {
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
          }
        }
        allTime: Page(page: 1, perPage: 10) {
          pageInfo {
            total
            perPage
          }
          media(status: FINISHED, sort: SCORE_DESC) {
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
          }
        }
      }
    `,
  });

  return {
    props: {
      data,
    },
  };
}
