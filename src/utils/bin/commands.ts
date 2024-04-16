// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';
import * as cowsayLib from 'cowsay';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + '\n';
    } else {
      c += Object.keys(bin).sort()[i - 1] + ' ';
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

// // FIXME: Make this shit not hard coded
// export const blogs = async (args: string[]): Promise<string> => {
//   const blogs = [
//     '<a href="/blogs/pqc">Post-Quantum Cryptography [March 1 2024]</a>',
//   ];
//   return blogs.join('\n');
// };

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I'm ${config.name}. 
Welcome to my website!
${config.bio}
More about me:
'sumfetch' - short summary.
'resume' - my latest resume.
'readme' - my github readme.`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

export const useless = async (args: string[]): Promise<string> => {
  const sitesList = [
    'https://sliding.toys/mystic-square/8-puzzle/daily/',
    'https://longdogechallenge.com/',
    'https://maze.toys/mazes/mini/daily/',
    'https://optical.toys',
    'https://paint.toys/',
    'https://puginarug.com',
    'https://alwaysjudgeabookbyitscover.com',
    'https://clicking.toys/flip-grid/neat-nine/3-holes/',
    'https://weirdorconfusing.com/',
    'https://checkbox.toys/scale/',
    'https://memory.toys/classic/easy/',
    'https://binarypiano.com/',
    'https://mondrianandme.com/',
    'https://onesquareminesweeper.com/',
    'https://cursoreffects.com',
    'http://floatingqrcode.com/',
    'https://thatsthefinger.com/',
    'https://cant-not-tweet-this.com/',
    'http://heeeeeeeey.com/',
    'http://corndog.io/',
    'http://eelslap.com/',
    'http://www.staggeringbeauty.com/',
    'http://burymewithmymoney.com/',
    'https://smashthewalls.com/',
    'https://jacksonpollock.org/',
    'http://endless.horse/',
    'http://drawing.garden/',
    'https://www.trypap.com/',
    'http://www.republiquedesmangues.fr/',
    'http://www.movenowthinklater.com/',
    'https://sliding.toys/klotski/easy-street/',
    'https://paint.toys/calligram/',
    'https://checkboxrace.com/',
    'http://www.rrrgggbbb.com/',
    'http://www.koalastothemax.com/',
    'https://rotatingsandwiches.com/',
    'http://www.everydayim.com/',
    'http://randomcolour.com/',
    'http://maninthedark.com/',
    'http://cat-bounce.com/',
    'http://chrismckenzie.com/',
    'https://thezen.zone/',
    'http://ninjaflex.com/',
    'http://ihasabucket.com/',
    'http://corndogoncorndog.com/',
    'http://www.hackertyper.com/',
    'https://pointerpointer.com',
    'http://imaninja.com/',
    'http://www.partridgegetslucky.com/',
    'http://www.ismycomputeron.com/',
    'http://www.nullingthevoid.com/',
    'http://www.muchbetterthanthis.com/',
    'http://www.yesnoif.com/',
    'http://lacquerlacquer.com',
    'http://potatoortomato.com/',
    'http://iamawesome.com/',
    'https://strobe.cool/',
    'http://thisisnotajumpscare.com/',
    'http://doughnutkitten.com/',
    'http://crouton.net/',
    'http://corgiorgy.com/',
    'http://www.wutdafuk.com/',
    'http://unicodesnowmanforyou.com/',
    'http://chillestmonkey.com/',
    'http://scroll-o-meter.club/',
    'http://www.crossdivisions.com/',
    'http://tencents.info/',
    'https://boringboringboring.com/',
    'http://www.patience-is-a-virtue.org/',
    'http://pixelsfighting.com/',
    'http://isitwhite.com/',
    'https://existentialcrisis.com/',
    'http://onemillionlols.com/',
    'http://www.omfgdogs.com/',
    'http://oct82.com/',
    'http://chihuahuaspin.com/',
    'http://www.blankwindows.com/',
    'http://tunnelsnakes.com/',
    'http://www.trashloop.com/',
    'http://spaceis.cool/',
    'http://www.doublepressure.com/',
    'http://www.donothingfor2minutes.com/',
    'http://buildshruggie.com/',
    'http://buzzybuzz.biz/',
    'http://yeahlemons.com/',
    'http://wowenwilsonquiz.com',
    'https://thepigeon.org/',
    'http://notdayoftheweek.com/',
    'http://www.amialright.com/',
    'https://optical.toys/thatcher-effect/',
    'https://greatbignothing.com/',
    'https://zoomquilt.org/',
    'https://dadlaughbutton.com/',
    'https://remoji.com/',
    'http://papertoilet.com/',
    'https://loopedforinfinity.com/',
    'https://end.city/',
    'https://www.bouncingdvdlogo.com/',
    'https://clicking.toys/peg-solitaire/english/',
    'https://toms.toys',
  ];
  window.open(sitesList[Math.floor(Math.random() * sitesList.length)]);
  return 'Opening a random useless website...';
};

// Donate
// export const donate = async (args: string[]): Promise<string> => {
//   return `thank you for your interest.
// here are the ways you can support my work:
// - <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.paypal}" target="_blank">paypal</a></u>
// - <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.patreon}" target="_blank">patreon</a></u>
// `;
// };

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Search
// export const google = async (args: string[]): Promise<string> => {
//   window.open(`https://google.com/search?q=${args.join(' ')}`);
//   return `You must hate privacy, searching Google for ${args.join(' ')}...`;
// };

// export const duckduckgo = async (args: string[]): Promise<string> => {
//   if (!args.length) {
//     return 'Usage: duckduckgo [search term]';
//   }
//   window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
//   return `Searching DuckDuckGo for ${args.join(' ')}...`;
// };

// export const bing = async (args: string[]): Promise<string> => {
//   if (!args.length) {
//     return 'Usage: bing [search term]';
//   }
//   window.open(`https://bing.com/search?q=${args.join(' ')}`);
//   return `Wow, really? You are using Bing for ${args.join(' ')}?`;
// };

// export const reddit = async (args: string[]): Promise<string> => {
//   if (!args.length) {
//     return 'Usage: reddit [search term]';
//   }
//   window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
//   return `Searching Reddit for ${args.join(' ')}...`;
// };

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

// export const ls = async (args: string[]): Promise<string> => {
//   return `a
// bunch
// of
// fake
// directories`;
// };

// export const cd = async (args: string[]): Promise<string> => {
//   return `unfortunately, i cannot afford more directories, so you will stay here.`;
// };

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

// export const vi = async (args: string[]): Promise<string> => {
//   return `woah, you still use 'vi'? just try 'vim'.`;
// };

// export const vim = async (args: string[]): Promise<string> => {
//   return `'vim' is so outdated. how about 'nvim'?`;
// };

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

export const cowsay = async (args: string[]): Promise<string> => {
  return cowsayLib.say({ text: args.join(' ') });
};

// Banner
export const banner = (args?: string[]): string => {
  return `
Welcome to

┌─┐┬─┐┌─┐┌─┐┬ ┬┌─┐ ┌─┐┌─┐┌┬┐
│  ├┬┘└─┐│  ├─┤├┤  │  │ ││││
└─┘┴└─└─┘└─┘┴ ┴└─┘o└─┘└─┘┴ ┴

The personal website of ${config.name} - a student and developer.

Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
`;
};
