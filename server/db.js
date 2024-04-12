import { MongoClient } from "mongodb";

const username = encodeURIComponent("vishwajeetrout8");
const password = encodeURIComponent("vishu@1950");
const cluster = "cluster0.j6g50g2.mongodb.net";
const auth = "DEFAULT";

const uri = `mongodb+srv://${username}:${password}@${cluster}/?authMechanism=${auth}`;

const client = new MongoClient(uri);
const connectedDB = async () => {
  try {
    await client.connect();
    console.log("Db connected successfully");
  } catch (e) {
    console.log(e);
    process.exit(1);
  } finally {
    client.close();
  }
};

export { client };
export default connectedDB;
