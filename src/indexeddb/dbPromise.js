import { openDB } from 'idb';

const dbName = 'my-database';
const dbVersion = 1

const dbPromise = openDB(dbName, dbVersion, {
	upgrade(db) {
		if (!db.objectStoreNames.contains('tasks')) {
			db.createObjectStore('persons', { keyPath: 'id', autoIncrement: true });
			db.createObjectStore('options', { keyPath: 'id', autoIncrement: true });
			// os.createIndex("place", "place", { unique: false, multiEntry: true });
		}
	},
});

export default dbPromise