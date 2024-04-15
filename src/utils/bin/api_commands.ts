// // List of commands that require API calls

import { getProjects } from '../api';
import { getQuote } from '../api';
import { getReadme } from '../api';
import { getWeather } from '../api';
import { getBlogs } from '../api';

function alignText(textList) {
  const maxColumnWidths = textList.reduce((widths, row) => {
    row.forEach((item, index) => {
      widths[index] = Math.max(widths[index] || 0, item.length);
    });
    return widths;
  }, []);

  return textList
    .map((row) => {
      const paddedRow = row.map((item, index) =>
        item.padEnd(maxColumnWidths[index]),
      );
      return paddedRow.join(' ');
    })
    .join('\n');
}

export const projects = async (args: string[]): Promise<string> => {
  const projects = await getProjects();
  return projects
    .map(
      (repo) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');
};

export const quote = async (args: string[]): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};

export const blogs = async (args: string[]): Promise<string> => {
  const blogs = await getBlogs();
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
  const weather = await getWeather(city);
  return weather;
};
