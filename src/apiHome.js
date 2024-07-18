import axios from 'axios';

const API_TOKEN = '002ad6d1502e52453f2eda95397aed';
const API_URL = 'https://graphql.datocms.com/';

const fetchHomeData = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            home {
              left
              right
              logoleft {
                url
              }
              logoright {
                url
              }
            }
          }
        `
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        }
      }
    );
    return response.data.data.home;
  } catch (error) {
    console.error('Error fetching home data:', error);
    return null;
  }
};

export { fetchHomeData };
