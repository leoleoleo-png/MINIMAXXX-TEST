import axios from 'axios';

const API_TOKEN = '5d643ac78706df2d7a3f0bc851da02';
const API_URL = 'https://graphql.datocms.com/';

const fetchColdPageData = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
        query MyQuery {
          coldPage {
            privacyPolicy
            termsOfUse
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
      coldPage: {
        privacyPolicy: response.data.data.coldPage.privacyPolicy,
        termsOfUse: response.data.data.coldPage.termsOfUse,
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const cmsColdPageDataPromise = fetchColdPageData();

export default cmsColdPageDataPromise;
