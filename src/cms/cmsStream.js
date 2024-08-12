import axios from 'axios';

const API_TOKEN = '5d643ac78706df2d7a3f0bc851da02';
const API_URL = 'https://graphql.datocms.com/';

const fetchStreamData = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
        query MyQuery {
          stream {
            online
            password
            secret
            streamLink
            domain
            streamTitle
            streamTitleOffline
            infos {
              info
              id
            }
            infoOverlay
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
      online: response.data.data.stream.online,
      password: response.data.data.stream.password,
      secret: response.data.data.stream.secret,
      streamLink: response.data.data.stream.streamLink,
      streamTitle: response.data.data.stream.streamTitle,
      streamTitleOffline: response.data.data.stream.streamTitleOffline,
      infos: response.data.data.stream.infos.map(info => info.info),
      infoOverlay: response.data.data.stream.infoOverlay,
    };
  } catch (error) {
    console.error('Error fetching stream data:', error);
    return null;
  }
};

const cmsStreamDataPromise = fetchStreamData();

export default cmsStreamDataPromise;
