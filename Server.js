const express = require("express");
require("dotenv").config();
const courses = [
  {
    id: "1",
    name: "Python",
    shortname: "Python",
    fee: 600,
  },
  {
    id: "2",
    name: "Development",
    shortname: "IT",
    fee: 500,
  },
  {
    id: "3",
    name: "Fluter",
    shortname: "Fluter",
    fee: 700,
  },
  {
    id: "4",
    name: "C++",
    shortname: "C++",
    fee: 600,
  },
  {
    id: "5",
    name: "React",
    shortname: "React",
    fee: 1000,
  },
];
const app = express();
app.use(express.json());
app.get("/caurse", (req, res) => {
  res.send(courses);
});
app.get("/caurse/:id", (req, res) => {
  const courseId = req.params.id;
  console.log(courseId);
  const coursedata = courses.find((coursedata) => coursedata.id === courseId);
  if (!coursedata) {
    res.send({
      isSuccesfull: true,
      data: null,
      massege: "data not Found",
    });
  } else {
    res.send({
      isSuccesfull: true,
      data: coursedata,
      massege: "",
    });
  }
});
app.post("/caurse", (req, res) => {
  const { name, shortname, fee } = req.body;
  const obj = { name, shortname, fee };
  obj.id = courses.length + 1;
  const errarray = [];
  if (!obj.name) {
    errarray.push("name is required");
  }
  if (!obj.shortname) {
    errarray.push("shortname is required");
  }
  if (!obj.fee) {
    errarray.push("fee is required");
  }
  if (errarray > 0) {
    res.send({
      isSuccesfull: false,
      data: errarray,
      massege: "",
    });
  } else {
    courses.push({ ...obj });
    res.send({
      isSuccesfull: true,
      data: obj,
      massege: "",
    });
  }
});
app.put("/caurse/:id", (req, res) => {
  const resourceId = req.params.id;
  const newData = req.body;
  const existingData = courses[resourceId];
  if (!existingData) {
    return res.send({
      isSuccesfull: true,
      data: null,
      massege: "data not Found",
    });
  }
  const updatedData = { ...existingData, ...newData };
  courses[resourceId] = updatedData;
  updatedData.id = req.params.id;
  res.send({
    isSuccesfull: true,
    data: updatedData,
    message: "Resource updated successfully",
  });
});
app.delete("/caurse/:id", (req, res) => {
  const resourceId = req.params.id;
  res.send({
    isSuccesfull: true,
    data: null,
    massege: "delte Succesfully",
  });
});
app.listen(process.env.PORT, () => {
  console.log(`server starting ${process.env.PORT}`);
});
