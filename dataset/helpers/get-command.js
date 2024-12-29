/**
 * @param {string[]} terminalArgs
 * @param {string[]} availableCommands
 * @returns {string}
 */
export const getCommand = (terminalArgs, availableCommands) => {
  if (
    terminalArgs.length <= 2 ||
    !availableCommands.includes(terminalArgs[2])
  ) {
    const commandsListString = availableCommands.join(', ');

    throw new Error(
      `Provide one of the available commands [${commandsListString}]`,
    );
  }

  return terminalArgs[2];
};
