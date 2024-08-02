import axios from 'axios';

const API_TOKEN = '5d643ac78706df2d7a3f0bc851da02';
const API_URL = 'https://graphql.datocms.com/';

const fetchData = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
        query MyQuery {
          wordmark {
            wordmark {
              url
            }
          }
          runner {
            runner {
              url
            }
          }
          icon {
            icons {
              url
              id
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

    return {
      wordmarkUrl: response.data.data.wordmark.wordmark.url,
      runnerUrl: response.data.data.runner.runner.url,
      icons: response.data.data.icon.icons.map(icon => icon.url) // Convert icons to an array of URLs
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const cmsDataPromise = fetchData();

export default cmsDataPromise;
