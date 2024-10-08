To populate MongoDB database with predefined data, follow this three steps:

1. Run the `npm install` command to install required dependencies.

2. Fill `.env` file with variables defined in the `env.sample.txt` file. Essentially it's MongoDB URI and your database name.

3. Run the `npm run db` command to insert all required data into the database.

The script creates 3 collections in the database:

- **films**
- **actors**
- **chapters**

## Notes

All seeding data are in the `data` folder. Delete or add the data to fit your likes. All data should follow schemas defined in the `schemas` folder.