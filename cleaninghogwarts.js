"use strict";
window.addEventListener("DOMContentLoaded", start);

let url = "https://petlatkea.dk/2021/hogwarts/students.json";

const Student = {
  firstname: "default firstname",
  lastname: "default lastname",
  gender: "default gender",
  house: "default house",
  nickname: "default nickname",
  middlename: "default middlename",
};

const allStudents = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    const student = Object.create(Student);
    const fullname = jsonObject.fullname.trim();
    const firstSpace = fullname.indexOf(" ");
    const lastSpace = fullname.lastIndexOf(" ");
    // const nickname = fullname.indexOf("`");

    const firstname = fullname.substring(0, firstSpace);
    const lastname = fullname.substring(lastSpace + 1);
    const middlename = fullname.substring(firstSpace + 1, lastSpace);

    const newFirstName = firstname.substring(0, 1).toUpperCase() + firstname.substring(1).toLowerCase();
    const newLastName = lastname.substring(0, 1).toUpperCase() + lastname.substring(1).toLowerCase();
    const newMiddleName = middlename.substring(0, 1).toUpperCase() + middlename.substring(1).toLowerCase();
    const house = jsonObject.house.trim();

    student.firstname = newFirstName;
    student.lastname = newLastName;
    student.gender = jsonObject.gender.substring(0, 1).toUpperCase() + jsonObject.gender.substring(1).toLowerCase();
    student.house = house.substring(0, 1).toUpperCase() + jsonObject.house.substring(1).toLowerCase();
    student.middlename = newMiddleName;

    allStudents.push(student);
    console.log(student);
  });
}
