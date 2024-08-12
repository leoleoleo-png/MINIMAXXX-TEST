import axios from 'axios';

const API_TOKEN = '5d643ac78706df2d7a3f0bc851da02';
const API_URL = 'https://graphql.datocms.com/';

const fetchInfoData = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
        query MyQuery {
          paragraph {
            paragraph1
            paragraph2
          }
          eventDetail {
            eventName
            largeText
            largeTextOffline
            details {
              id
              info
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
      paragraphs: {
        paragraph1: response.data.data.paragraph.paragraph1,
        paragraph2: response.data.data.paragraph.paragraph2,
      },
      eventDetail: {
        eventName: response.data.data.eventDetail.eventName,
        largeText: response.data.data.eventDetail.largeText,
        largeTextOffline: response.data.data.eventDetail.largeTextOffline,
        details: response.data.data.eventDetail.details.map(detail => detail.info),
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const cmsInfoDataPromise = fetchInfoData();

export default cmsInfoDataPromise;
