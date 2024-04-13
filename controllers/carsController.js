import { client } from "../server/db.js";

const addCars = async (req, res) => {
  const { car, type, name, model, car_info } = req.body;
  try {
    await client.connect();
    const database = client.db("car_db");
    const collection = database.collection("cars");

    const cars = {
      car,
      type,
      name,
      model,
      car_info,
    };
    await collection.insertOne(cars);
    res.status(201).json({ message: "Car add in databse successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const cars = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("car_db");
    const collection = database.collection("cars");
    const data = await collection.find({car: "yes"}).toArray();
    res.status(201).json(data);


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

export { addCars, cars };
