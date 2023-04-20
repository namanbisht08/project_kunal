const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const fs = require("fs");
require("dotenv").config();

app.get("/api/q1", (req, res) => {
  User.find({
    $and: [
      { income: { $lt: "$5" } },
      { car: { $in: ["BMW", "Mercedes-Benz"] } },
    ],
  })
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send("No users found.");
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database.");
    });
});

app.get("/api/q2", (req, res) => {
  User.find({
    $and: [{ gender: "Male" }, { phone_price: { $regex: /^1\d{4,}$/ } }],
  })
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send("No users found.");
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database.");
    });
});

app.get("/api/q3", async (req, res) => {
  try {
    const users = await User.find({
      last_name: { $regex: /^M/ }, // starts with "M"
      quote: { $exists: true, $type: "string", $regex: /.{16,}/ }, // quote length greater than 15
    }).exec();

    const filteredUsers = users.filter((user) => {
      const email = user.email.toLowerCase();
      const lastName = user.last_name.toLowerCase();
      return email.includes(lastName) && lastName.startsWith("m");
    });

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/api/q4", (req, res) => {
  User.find({
    $and: [
      { car: { $in: ["BMW", "Mercedes", "Audi", "Mercedes-Benz"] } },
      { email: { $not: /\d/ } },
    ],
  })
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send("No users found for the given conditions.");
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database.");
    });
});

app.get("/api/q5", async (req, res) => {
  try {
    const cities = await User.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          avgIncome: { $avg: "$income" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { city: "$_id", count: 1, avgIncome: 1, _id: 0 } },
    ]);
    res.status(200).json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

const jsonData = fs.readFileSync("sample_data.json");
const users = JSON.parse(jsonData);
User.deleteMany({})
  .then(() => console.log("Data deleted..."))
  .catch((err) => console.error("Error deleting :", err));
User.insertMany(users)
  .then(() => console.log("Data inserted into database..."))
  .catch((err) => console.error("Error inserting data into database:", err));

mongoose
  .connect(process.env.MONGODB_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(3001, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
