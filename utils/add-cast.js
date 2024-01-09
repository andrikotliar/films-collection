import inquirer from 'inquirer';
import { createNewActorData } from './helpers/create-new-actor-data.js';
import { writeData } from './helpers/write-data.js';

import actors from './data/actors.json' assert { type: 'json' };

const askContinue = async () => {
  const answers = await inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    default: true,
  });

  return answers.continue;
};

const getAnswers = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'name',
      message: 'Actor Name:',
    },
    {
      name: 'characterName',
      message: 'Character Name:',
    },
  ]);

  return answers;
};

const collectActorsData = async (options) => {
  const { name, characterName } = await getAnswers();

  const foundActor = options.actors.find((actor) => actor.name.includes(name));

  if (foundActor) {
    console.log('Found Actor', foundActor);

    const castData = {
      actorId: foundActor.id,
      name: foundActor.name,
      character: {
        name: characterName,
        imageUrl: null,
      },
    };

    options.cast.push(castData);

    const doContinue = await askContinue();

    if (doContinue) {
      await collectActorsData(options);
    }

    return;
  }

  const { newActor, castData } = createNewActorData(name, characterName);

  options.actors.push(newActor);
  options.cast.push(castData);

  const doContinue = await askContinue();

  if (doContinue) {
    await collectActorsData(options);
  }

  return;
};

const addCast = async (fileName) => {
  console.log('Adding cast');

  const actorsCopy = [...actors];
  const cast = [];

  await collectActorsData({
    fileName,
    actors: actorsCopy,
    cast,
  });

  writeData(actorsCopy, './utils/data/actors.json');

  return cast;
};

export { addCast };
