import fs from 'fs';
import crypto from 'crypto';
import inquirer from 'inquirer';
import { prepareFileName } from './helpers/prepare-file-name.js';
import actors from './data/actors.json' assert { type: 'json' };

const askContinue = async () => {
  const answers = await inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    default: true,
  });

  return answers.continue;
};

const writeData = (data) => {
  fs.writeFileSync(
    './utils/data/actors.json',
    JSON.stringify(data, undefined, 2),
    'utf-8',
  );
};

const createFileName = (actorId, actorName) => {
  const formattedName = prepareFileName(actorName.toLowerCase());
  const result = `${formattedName}_${actorId}.webp`;

  return result;
};

const askQuestions = async (actors, names) => {
  const answers = await inquirer.prompt({
    name: 'name',
    message: 'Actor Name:',
  });

  const doesActorExist = names.includes(answers.name);

  if (doesActorExist) {
    console.log('Actor already exists');

    const doContinue = await askContinue();

    if (doContinue) {
      await askQuestions(actors, names);
    } else {
      return;
    }
  }

  const id = crypto.randomUUID();
  const photoUrl = createFileName(id, answers.name);

  const data = {
    name: answers.name,
    photoUrl,
  };

  actors[id] = data;

  const doContinue = await askContinue();

  if (doContinue) {
    await askQuestions(actors, names);
  } else {
    writeData(actors);
  }
};

const start = async (originalActors) => {
  const names = [];
  const actors = { ...originalActors };

  for (const key in actors) {
    names.push(actors[key].name);
  }

  await askQuestions(actors, names);
};

start(actors);
