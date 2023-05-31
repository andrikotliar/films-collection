import fs from 'fs';

const createDB = () => {
	const files = fs.readdirSync('./db/')
	const db = [];

	for(const file of files) {
		const fileData = fs.readFileSync(`./db/${file}`, 'utf8');
		db.push(JSON.parse(fileData));
	}

	const sortedDB = db.sort((a, b) => a.year < b.year ? 1 : -1);

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

if(fs.existsSync('./public/database')) {
  createDB();
} else {
  createFolderForDB();
}