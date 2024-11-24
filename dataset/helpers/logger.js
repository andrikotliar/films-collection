import chalk from 'chalk';

class Logger {
  success(...messages) {
    console.log(chalk.green(...messages));
  }

  error(...messages) {
    console.log(chalk.red(...messages));
  }

  startProcess(...messages) {
    console.log(chalk.yellow(...messages));
  }

  finishProcess(...messages) {
    console.log(chalk.cyan(...messages));
  }

  warning(...messages) {
    console.log(chalk.yellowBright(...messages));
  }

  info(...messages) {
    console.log(chalk.gray(...messages));
  }
}

const logger = new Logger();

export { logger };
