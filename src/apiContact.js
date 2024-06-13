import axios from 'axios';

const API_TOKEN = '002ad6d1502e52453f2eda95397aed';
const API_URL = 'https://graphql.datocms.com/';

const fetchContactInfo = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            contact {
              country
              days
              email
              hours
              id
              street
              telephone
              zipcode
              addresslink
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
    return response.data.data.contact;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
};

export { fetchContactInfo };
