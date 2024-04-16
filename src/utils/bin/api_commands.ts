// // List of commands that require API calls

// import { get } from 'http';
// import { getProjects } from '../api';
// import { getQuote } from '../api';
// import { getReadme } from '../api';
// import { getWeather } from '../api';
// import { getBlogs } from '../api';
// import { getActivity } from '../api';
// import { getDumbQuote } from '../api';

import * as api from '../api';

export const projects = async (args: string[]): Promise<string> => {
  const projects = await api.getProjects();
  return projects
    .map(
      (repo) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');
};

export const blogs = async (args: string[]): Promise<string> => {
  const blogs = await api.getBlogs();
  // const formatted = blogs.map((blog) => {
  //   return `<a href="/blogs/${blog.slug}">${blog.title} [${blog.date}] ./blogs/${blog.slug}</a>`;
  // });
  // return formatted.join('\n');
  const formatted = blogs.map((blog) => {
    return `<tr><td><strong>${blog.title}</strong></td><td style="opacity: 50%">[${blog.date}]</td><td><a href='/blogs/${blog.slug}'> <u>./blogs/${blog.slug}</u></a></td></tr>`;
  });
  return `<table>${formatted.join('\n')}</table>`;
};

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) {
    return 'Usage: weather [city]. Example: weather casablanca';
  }
  const weather = await api.getWeather(city);
  return weather;
};

export const imbored = async (args: string[]): Promise<string> => {
  return api.getActivity();
};

export const quote = async (args: string[]): Promise<string> => {
  const usage =
    'Usage: quote [normal|dumb|bad] - Get a random quote. Default: normal';
  if (
    args[0] === '-h' ||
    args[0] === '--help' ||
    args[0] === 'help' ||
    args[0] === 'h' ||
    args[0] === '-help'
  ) {
    return usage;
  } else if (args.length > 1) {
    return 'Please provide only one arg';
  }
  // No rust :(
  let quote: api.Quote;
  switch (args[0]) {
    case 'dumb':
      quote = await api.getDumbQuote();
      break;
    case 'bad':
      quote = await api.getBadQuote();
      break;
    case 'normal':
      quote = await api.getNormalQuote();
      break;
    case undefined:
      quote = await api.getNormalQuote();
      break;
    default:
      return `Incorrect arg:'${args[0]}'\n${usage}`;
  }
  return `"${quote.quote}"\n - ${quote.author}`;
};

export const stock = async (args: string[]): Promise<string> => {
  const usage = "Usage: stock [symbol]. Example: 'stock AAPL'";
  if (!args.length) {
    return usage;
  } else if (args.length > 1) {
    return 'Please provide only one symbol';
  } else if (
    args[0] === '-h' ||
    args[0] === '--help' ||
    args[0] === 'help' ||
    args[0] === 'h' ||
    args[0] === '-help'
  ) {
    return usage;
  }

  const stock = await api.getStock(args[0]);
  if (stock.c === 0) {
    return `'${args[0]}' is not a valid ticker`;
  }
  return `${stock.c} Δ ${(stock.dp as number).toPrecision(3)}%`;
};

// export const insult = async (args: string[]): Promise<string> => {
//   const quote = await api.getInsult();
//   return `"${quote.quote}"\n - ${quote.author}`;
// };
// export
