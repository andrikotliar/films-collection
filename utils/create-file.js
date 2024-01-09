import inquirer from 'inquirer';
import { randomUUID } from 'crypto';
import { prepareFileName } from './helpers/prepare-file-name.js';
import { writeData } from './helpers/write-data.js';
import { getTemplate } from './helpers/get-template.js';
import { addCast } from './add-cast.js';

const createTemplate = async ({ type, title, year }) => {
  const fileName = prepareFileName(title);

  const currentTemplate = getTemplate(type);

  if (!currentTemplate) {
    throw Error(`Template for the ${type} type not found!`);
  }

  const filePath = `./db/_${fileName}.json`;
  const cast = await addCast(filePath);

  currentTemplate.id = randomUUID();
  currentTemplate.title = title;
  currentTemplate.type = type;
  currentTemplate.year = year;
  currentTemplate.media[0].poster = `${fileName.toLowerCase()}.webp`;
  currentTemplate.cast = cast;

  writeData(currentTemplate, filePath);
};

const processTemplates = async () => {
  const currentYear = new Date().getFullYear();

  const answers = await inquirer.prompt([
    {
      name: 'title',
      message: 'Title:',
    },
    {
      type: 'checkbox',
      name: 'type',
      message: 'Type:',
      choices: ['Film', 'Animation', 'Series'],
      default: 'Film',
    },
    {
      type: 'number',
      name: 'year',
      message: 'Release year:',
      default: currentYear,
    },
  ]);

  createTemplate(answers);
};

processTemplates();
