import md5 from "md5";
const Sqlite3 = require("sqlite3").verbose();

const database = new Sqlite3.Database(process.env.DB_PATH);

database.run("CREATE TABLE IF NOT EXISTS users (uuid TEXT UNIQUE, first_name TEXT, last_name TEXT, email TEXT UNIQUE, phone INT UNIQUE, password TEXT, reset_token TEXT UNIQUE, confirmation_token TEXT, active INT DEFAULT 0, created_at INT)", err => {
  if (err) returnconsole.log(err);
});

database.run("CREATE TABLE IF NOT EXISTS services (name TEXT ,uuid TEXT UNIQUE, description TEXT)", err => {
  if (err) return console.log(err);
});

database.run("CREATE TABLE IF NOT EXISTS streets (city TEXT, name TEXT)", err => {
  if (err) return console.log(err);
});

const createUser = async user => {
  return new Promise((resolve, reject) => {
    database.run("INSERT INTO users (uuid, email, phone, password, confirmation_token, created_at) VALUES (?, ?, ?, ?, ?, ?)", [user.user_unique_id, user.email, user.phone, user.password, user.confirmation_token, user.created_at], err => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const checkEmail = async email => {
  return new Promise((resolve, reject) => {
    database.get("SELECT * FROM users WHERE email = ?", email, (err, data) => {
      // reject if any error
      if (err) reject(err);

      // reject if the email has been taken
      if (data) reject("Acest email este asociat unui cont!");
      else resolve(true);
    });
  });
};

const checkPhone = async phone => {
  return new Promise((resolve, reject) => {
    database.get("SELECT * FROM users WHERE phone = ?", phone, (err, data) => {
      // reject if any error
      if (err) reject(err);

      // reject if the email has been taken
      if (data) reject("Acest numar de telefon este asociat unui cont!");
      else resolve(true);
    });
  });
};

const verifyUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    database.get("SELECT * FROM users WHERE email = ?", email, (err, data) => {
      // reject if any error
      if (err) return reject(err);

      // reject if user does not exists
      if (!data) return reject("Utilizatorul nu a fost găsit!");

      // resolve if the password is the same
      if (data.password === md5(password)) resolve(data.uuid);
      else reject("Parolă incorectă!");
    });
  });
};

const getUserByUUID = async uuid => {
  return new Promise((resolve, reject) => {
    database.get("SELECT first_name, last_name, email, phone, active FROM users WHERE uuid = ? ", uuid, (err, data) => {
      if (err) reject(err);
      if (data) resolve(data);
    });
  });
};

const confirmAcountByUUID = async uuid => {
  return new Promise((resolve, reject) => {
    database.run("UPDATE users SET active = 1 WHERE uuid = ?", uuid, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const getAllServices = async () => {
  return new Promise((resolve, reject) => {
    database.all("SELECT * FROM services", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const getServiceByUUID = async uuid => {
  return new Promise((resolve, reject) => {
    database.get("SELECT * FROM services WHERE uuid = ?", uuid, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const getAllStreets = async () => {
  return new Promise((resolve, reject) => {
    database.all("SELECT * FROM streets", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export { createUser, checkEmail, checkPhone, verifyUser, getUserByUUID, confirmAcountByUUID, getAllServices, getServiceByUUID, getAllStreets };
