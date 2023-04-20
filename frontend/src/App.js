import React, { useState, useEffect } from "react";
import UserTable from "./Table";
import "./UserTable.css";

function App() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  useEffect(() => {
    fetch("/api/q1")
      .then((response) => response.json())
      .then((data1) => setData1(data1));

    fetch("/api/q2")
      .then((response) => response.json())
      .then((data2) => setData2(data2));

    fetch("/api/q3")
      .then((response) => response.json())
      .then((data3) => setData3(data3));

    fetch("/api/q4")
      .then((response) => response.json())
      .then((data4) => setData4(data4));

    fetch("/api/q5")
      .then((response) => response.json())
      .then((data5) => setData5(data5));
  }, []);

  return (
    <div className="App">
      <h1>
        1. Users which have income lower than $5 USD and have a car of brand
        “BMW” or “Mercedes”.
      </h1>
      <UserTable data={data1} />

      <h1>2. Male Users which have phone price greater than 10,000.</h1>
      <UserTable data={data2} />

      <h1>
        3. Users whose last name starts with “M” and has a quote character
        length greater than 15 and email includes his/her last name.
      </h1>
      <UserTable data={data3} />

      <h1>
        4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose
        email does not include any digit.
      </h1>
      <UserTable data={data4} />

      <h1>
        5. Show the data of top 10 cities which have the highest number of users
        and their average income.
      </h1>
      <UserTable data={data5} />
    </div>
  );
}

export default App;
