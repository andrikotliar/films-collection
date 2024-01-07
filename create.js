import { createInterface } from 'readline';
import fs from 'fs';
import { v4 as uuid } from 'uuid';

import filmTemplate from './templates/film.json' assert { type: 'json' };
import seriesTemplate from './templates/series.json' assert { type: 'json' };

const templates = {
  film: filmTemplate,
  series: seriesTemplate,
};

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Title: ', (title) => {
  readline.question('Is series (y / n) [optional]? ', (isSeries) => {
    createTemplate(title, isSeries);
    readline.close();
  });
});

const prepareTitle = (title) => {
  const strWithoutSpecialSymbols = title.replaceAll(/[^a-zA-Z0-9\s]/g, '');
  const formattedTitle = strWithoutSpecialSymbols.replaceAll(' ', '_');

  return formattedTitle;
};

const createTemplate = (title, isSeriesAnswer) => {
  console.log('Processing...');

  const lcTypeAnswer = isSeriesAnswer.toLowerCase();
  const type = lcTypeAnswer === 'y' ? 'series' : 'film';

  const fileTitle = prepareTitle(title);

  const currentTemplate = templates[type];

  if (!currentTemplate) {
    throw Error(`Template for the ${type} type not found!`);
  }

  currentTemplate.id = uuid();
  currentTemplate.title = title;

  fs.writeFileSync(
    `./db/${fileTitle}.json`,
    JSON.stringify(currentTemplate, undefined, 2),
    'utf-8',
  );

  console.log('Finished');
};
