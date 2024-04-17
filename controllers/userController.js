import { client } from "../server/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSignup = async (req, res) => {
  try {
    const { email, password, location, user_info, vehicle_info } = req.body;

    if (!email || !password || !location || !user_info || !vehicle_info) {
      res.status(400).json({ message: "All fields are necessary" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      password: hashPassword,
      location,
      user_info,
      vehicle_info,
    };

    await client.connect();
    const database = client.db("user_db");
    const collection = database.collection("user");

    await collection.insertOne(user);

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are necessary" });
    }

    await client.connect();
    const database = client.db("user_db");
    const collection = database.collection("user");

    const user = await collection.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Authentication failed" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Login successfull", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export { userSignup, userLogin };
