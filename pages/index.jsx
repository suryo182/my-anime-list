import { gql } from '@apollo/client';
import { Container, Wrap } from '@chakra-ui/react';
import client from '../apollo-client';
import Card from '../components/Card';
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
              <Card anime={anime} key={anime.id} />
            ))}
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
