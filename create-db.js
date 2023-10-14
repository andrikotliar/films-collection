import fs from 'fs';

const createDB = () => {
	const files = fs.readdirSync('./db/')
	const db = files.map((file) => {
    try {
      const fileData = fs.readFileSync(`./db/${file}`, 'utf8');
      return JSON.parse(fileData);
    } catch(e) {
      console.error(e?.message);
    }
  });

	const sortedDB = db.sort((a, b) => a.years[0] < b.years[0] ? 1 : -1);

	fs.writeFile('./public/database/database.json', JSON.stringify(sortedDB), (error) => {
    if(error) {
      console.log(error);
      return;
    }
		console.log('Database completed!');
	});
}

const createFolderForDB = () => {
  fs.mkdir('./public/database', (error) => {
    if (error) console.log(error);
    createDB();
  });
}

const init = () => {
  try {
    if (fs.existsSync('./public/database')) {
      createDB();
    } else {
      createFolderForDB();
    }
  } catch (error) {
    console.error(error);
  }
}

init();
