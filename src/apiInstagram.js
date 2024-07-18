import axios from 'axios';

const API_TOKEN = '002ad6d1502e52453f2eda95397aed';
const API_URL = 'https://graphql.datocms.com/';

const fetchInstagramLinks = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            instagram {
              linkbar
              linkbrand
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
    return {
      linkbar: response.data.data.instagram.linkbar,
      linkbrand: response.data.data.instagram.linkbrand,
    };
  } catch (error) {
    console.error('Error fetching Instagram links:', error);
    return {
      linkbar: null,
      linkbrand: null,
    };
  }
};

export { fetchInstagramLinks };
