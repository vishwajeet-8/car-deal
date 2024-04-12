import { client } from "../server/db.js";

const getAllCar = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("car_db");
    const collection = database.collection("carList");

    const results = collection.find({ type: "car" });
    const data = await results.toArray();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const addCar = async (req, res) => {
  try {
    const { type, name, model, category, color, price } = req.body;
    if (!type || !name || !model || !category || !color || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await client.connect();
    const database = client.db("car_db");
    const collection = database.collection("carList");

    const car = {
      type,
      name,
      model,
      category,
      color,
      price,
    };

    await collection.insertOne(car);

    res.status(201).json({ message: "Car added successfully" });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ message: "Failed to add car" });
  } finally {
    await client.close();
  }
};

export { getAllCar, addCar };
