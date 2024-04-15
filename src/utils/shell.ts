import React from 'react';
import * as bin from './bin';

export const shell = async (
  command: string,
  setHistory: (value: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const args = command.split(' ');
  args[0] = args[0].toLowerCase();

  if (args[0] === 'clear') {
    clearHistory();
  } else if (command === '') {
    setHistory('');
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
    );
  } else {
    // TODO: Handle more complex command structure?
    const params = args.slice(1);
    var shouldExec = true;
    for (let i = 0; i < params.length; i++) {
      if (params[i].startsWith('$(')) {
        if (params[i].endsWith(')')) {
          const subcommand = params[i].slice(2, -1);
          if (Object.keys(bin).indexOf(subcommand) === -1) {
            setHistory(
              `shell: command not found: ${subcommand}. Try 'help' to get started.`,
            );
            shouldExec = false;
            break;
          }
          const output = await bin[subcommand]();
          params[i] = output;
        } else {
          setHistory('shell: syntax error: malformed command substitution.');
          shouldExec = false;
        }
      }
    }
    if (shouldExec) {
      const output = await bin[args[0]](params);
      setHistory(output);
    }
  }

  setCommand('');
};
