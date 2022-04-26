import { gql } from '@apollo/client';
import client from '../apollo-client';

export default function Home({ data }) {
  const { trending } = data;
  return <div>Home</div>;
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query getAnime {
        trending: Page(page: 1, perPage: 6) {
          pageInfo {
            total
            perPage
          }
          media(seasonYear: 2022, status: RELEASING, averageScore_greater: 77) {
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
        popular: Page(page: 1, perPage: 6) {
          pageInfo {
            total
            perPage
          }
          media(
            season: SPRING
            status: RELEASING
            seasonYear: 2022
            averageScore_greater: 70
            popularity_greater: 40000
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
      }
    `,
  });

  return {
    props: {
      data,
    },
  };
}
