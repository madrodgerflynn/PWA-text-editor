import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error("PUT to the database");
  //opens connection to db and which version
  const openDb = await openDB("jate", 1);
  //creates a new transaction and its allowences
  const tx = openDB.transaction("jate", "readwrite");
  //open up the desired object store
  const store = tx.objectStore("jate");
  //adds this to the method and adds 1 to the counter
  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log("result.value", result);
  return result;
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error("GET from DB");
  const openDb = await openDB("jate", 1);
  const tx = openDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();