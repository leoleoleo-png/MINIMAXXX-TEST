import axios from 'axios';

const API_TOKEN = '002ad6d1502e52453f2eda95397aed';
const API_URL = 'https://graphql.datocms.com/';

const fetchAddresses = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            vente {
              addresses {
                id
                name
                postcode
                street
                link
                country
              }
              id
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
    return response.data.data.vente.addresses;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return [];
  }
};

export { fetchAddresses };
