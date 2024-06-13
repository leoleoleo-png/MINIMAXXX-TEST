import axios from 'axios';

const API_TOKEN = '002ad6d1502e52453f2eda95397aed';
const API_URL = 'https://graphql.datocms.com/';

const fetchCognacData = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            cognac {
              id
              paragraph1
              paragraph2
              paragraph3
              title
              flower {
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
    return response.data.data.cognac;
  } catch (error) {
    console.error('Error fetching cognac data:', error);
    return null;
  }
};

export { fetchCognacData };
