import fs from 'fs';
import inquirer from 'inquirer';
import crypto from 'crypto';
import { prepareFileName } from './helpers/prepare-file-name.js';

import filmTemplate from './templates/film.json' assert { type: 'json' };
import seriesTemplate from './templates/series.json' assert { type: 'json' };

const templates = {
  film: filmTemplate,
  series: seriesTemplate,
};

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Title:',
    },
    {
      type: 'confirm',
      name: 'isSeries',
      message: 'Is series? (optional):',
      default: false,
    },
  ])
  .then((answers) => {
    createTemplate(answers);
  });

const createTemplate = ({ isSeries, title }) => {
  console.log('Processing...');

  const type = isSeries ? 'series' : 'film';

  const fileTitle = prepareFileName(title);

  const currentTemplate = templates[type];

  if (!currentTemplate) {
    throw Error(`Template for the ${type} type not found!`);
  }

  currentTemplate.id = crypto.randomUUID();
  currentTemplate.title = title;

  fs.writeFileSync(
    `./db/${fileTitle}.json`,
    JSON.stringify(currentTemplate, undefined, 2),
    'utf-8',
  );

  console.log('Finished');
};
