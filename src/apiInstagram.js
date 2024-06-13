import axios from 'axios';

const API_TOKEN = '002ad6d1502e52453f2eda95397aed';
const API_URL = 'https://graphql.datocms.com/';

const fetchInstagramLink = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            instagram {
              link
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
    return response.data.data.instagram.link;
  } catch (error) {
    console.error('Error fetching Instagram link:', error);
    return null;
  }
};

export { fetchInstagramLink };
