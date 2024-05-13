import axios from 'axios';

const API_TOKEN = '002ad6d1502e52453f2eda95397aed';
const API_URL = 'https://graphql.datocms.com/';


const fetchLegal = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            coldpage {
              legal
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
    return response.data.data.coldpage.legal;
  } catch (error) {
    console.error('Error fetching legal:', error);
    return null;
  }
};

const fetchConf = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            coldpage {
              confidentiality
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
    return response.data.data.coldpage.confidentiality;
  } catch (error) {
    console.error('Error fetching confidentiality:', error);
    return null;
  }
};

export { fetchLegal, fetchConf };
