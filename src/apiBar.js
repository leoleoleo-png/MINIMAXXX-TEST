import axios from 'axios';

const API_TOKEN = '002ad6d1502e52453f2eda95397aed';
const API_URL = 'https://graphql.datocms.com/';

const fetchPhotos = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            bar {
              gallery {
                id
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
    return response.data.data.bar.gallery;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};

const fetchTitle = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            bar {
              title
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
    return response.data.data.bar.title;
  } catch (error) {
    console.error('Error fetching title:', error);
    return null;
  }
};

const fetchSubtitle = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
          {
            bar {
              subtitle
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
    return response.data.data.bar.subtitle;
  } catch (error) {
    console.error('Error fetching subtitle:', error);
    return null;
  }
};

export { fetchPhotos, fetchTitle, fetchSubtitle };
