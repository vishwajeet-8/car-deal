import { client } from "../server/db.js";
import { ObjectId } from "mongodb";

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
    const data = await collection.find({ car: "yes" }).toArray();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const findCar = async (req, res) => {
  try {
    const id = new ObjectId(req.params.carId); // Assuming req.params.id is a valid ObjectId string

    await client.connect();
    const database = client.db("car_db");
    const data = await database.collection("cars").findOne({ _id: id });

    if (!data) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred while finding car:", error); // Log the specific error for debugging
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close(); // Close the MongoDB client connection
  }
};

export { addCars, cars, findCar };
