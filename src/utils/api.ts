import axios from 'axios';
import config from '../../config.json';
import { BlogMetadata } from './blogs';
// TODO: Add try-catch to everything

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );
  return data;
};

export const getReadme = async () => {
  const { data } = await axios.get(config.readmeUrl);
  return data;
};

export const getBlogs = async () => {
  const metaData: BlogMetadata[] = await axios
    .get('/api/getBlogs', { responseType: 'json' })
    .then((res) => res.data);
  return metaData;
};

export const getActivity = async () => {
  const data = await axios
    .get('https://www.boredapi.com/api/activity/', {
      responseType: 'json',
    })
    .then((res) => res.data);
  return data.activity;
};

export const getWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?ATm`);
    return data;
  } catch (error) {
    return error;
  }
};

export type Quote = {
  quote: string;
  author: string;
};

export const getNormalQuote = async (): Promise<Quote> => {
  const data = await axios
    .get('https://api.quotable.io/random')
    .then((res) => res.data);
  return {
    quote: data.content,
    author: data.author,
  };
};

export const getDumbQuote = async (): Promise<Quote> => {
  const data = await axios
    .get('https://api.tronalddump.io/random/quote')
    .then((res) => res.data);
  // console.log(data);
  return {
    quote: data.value,
    author: (data['_embedded'].author as any[])[0]?.name || 'Unknown',
  };
};

// export const async function()

export const getBadQuote = async (): Promise<Quote> => {
  const data = await axios
    .get('https://api.breakingbadquotes.xyz/v1/quotes')
    .then((res) => res.data);
  return {
    quote: data[0]?.quote || 'Something went wrong ╭( ๐_๐)╮',
    author: data[0]?.author || 'Conor Scheidt',
  };
  // return quote;
};
//FIXME: CORS issues
// export const getInsult = async (): Promise<Quote> => {
//   const data = await axios
//     .get('https://evilinsult.com/generate_insult.php', {
//       responseType: 'json',
//       headers: {
//         'Sec-Fetch-Site': 'none',
//       },
//       params: {
//         lang: 'en',
//         type: 'json',
//       },
//     })
//     .catch((err) => {
//       throw err;
//     }) // TODO: Handle this better
//     .then((res) => res.data);
//   return {
//     quote: data.insult,
//     author: data.createdBy,
//   };
// };
export const getStock = async (symbol: string): Promise<any> => {
  return axios
    .get('https://finnhub.io/api/v1/quote', {
      responseType: 'json',

      params: {
        symbol,
        // TODO: This probably shouldn't be here
        token: process.env.NEXT_PUBLIC_FINNHUB_KEY,
      },
    })
    .then((res) => res.data);
};
