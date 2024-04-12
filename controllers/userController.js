import { client } from "../server/db.js";
import bcrypt from "bcrypt";

const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      password: hashPassword,
    };

    await client.connect();
    const database = client.db("user_db");
    const collection = database.collection("user");

    const result = collection.insertOne(user);

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export { userSignup };
