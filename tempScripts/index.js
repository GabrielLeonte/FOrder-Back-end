const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../database/falticeniorder.db");
const streets = require("./streets.json");

streets.forEach(element => {
  db.run(`INSERT INTO streets (city, name) VALUES ("Falticeni" , ?)`, element, err => {
    if (err) console.log(err);
  });
});
