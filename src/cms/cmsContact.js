import axios from 'axios';

const API_TOKEN = '5d643ac78706df2d7a3f0bc851da02';
const API_URL = 'https://graphql.datocms.com/';

const fetchContactData = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
        query MyQuery {
          contact {
            email
            jobsEmail
            otherLinks {
              link
              name
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
      email: response.data.data.contact.email,
      jobsEmail: response.data.data.contact.jobsEmail,
      otherLinks: response.data.data.contact.otherLinks.map(link => ({
        name: link.name,
        url: link.link // Ensure the property is named "url"
      }))
    };
  } catch (error) {
    console.error('Error fetching contact data:', error);
    return null;
  }
};

const cmsContactDataPromise = fetchContactData();

export default cmsContactDataPromise;
