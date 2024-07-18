import axios from 'axios';

const API_TOKEN = '002ad6d1502e52453f2eda95397aed';
const API_URL = 'https://graphql.datocms.com/';

const fetchBandeData = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            bande {
              bar
              brand
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
    return response.data.data.bande;
  } catch (error) {
    console.error('Error fetching bande data:', error);
    return {
      bar: null,
      brand: null,
    };
  }
};

export { fetchBandeData };
