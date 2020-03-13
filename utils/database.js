import md5 from "md5";
const Sqlite3 = require("sqlite3").verbose();

const database = new Sqlite3.Database(process.env.DB_PATH);

database.run("CREATE TABLE IF NOT EXISTS users (uuid TEXT UNIQUE, first_name TEXT, last_name TEXT, email TEXT UNIQUE, phone INT UNIQUE, password TEXT, reset_token TEXT UNIQUE, confirmation_token TEXT, active INT DEFAULT 0, created_at INT)", err => {
  if (err) return console.log(err);
});

database.run("CREATE TABLE IF NOT EXISTS services (name TEXT ,uuid TEXT UNIQUE, description TEXT)", err => {
  if (err) return console.log(err);
});

database.run("CREATE TABLE IF NOT EXISTS streets (city TEXT, name TEXT)", err => {
  if (err) return console.log(err);
});

database.run("CREATE TABLE IF NOT EXISTS open_services (id TEXT UNIQUE, timestamp INT, service_name TEXT, description TEXT, contact_phone INT, contact_firstname TEXT, contact_lastname TEXT, street TEXT, address_house_number INT, address_block_number TEXT, address_apartament_number INT, budget INT, user_id TEXT, last_geolocation TEXT, status TEXT, taken_by TEXT)", err => {
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
    database.get("SELECT uuid, first_name, last_name, email, phone, active FROM users WHERE uuid = ? ", uuid, (err, data) => {
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

const createOrder = async (id, timestamp, service_name, description, contact_phone, contact_firstname, contact_lastname, street, address_house_number, address_block_number, address_apartament_number, budget, user_id, last_geolocation, status, taken_by) => {
  return new Promise((resolve, reject) => {
    database.run("INSERT INTO open_services (id, timestamp, service_name, description, contact_phone, contact_firstname, contact_lastname,street,  address_house_number, address_block_number, address_apartament_number, budget, user_id, last_geolocation, status, taken_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [id, timestamp, service_name, description, contact_phone, contact_firstname, contact_lastname, street, address_house_number, address_block_number, address_apartament_number, budget, user_id, last_geolocation, status, taken_by], err => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const getOrdersByUUID = async uuid => {
  return new Promise((resolve, reject) => {
    database.all("SELECT * FROM open_services WHERE user_id = ?", uuid, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const getAllOpenOrders = async uuid => {
  return new Promise((resolve, reject) => {
    database.all("SELECT * FROM open_services WHERE status = ? AND user_id != ?", "Se așteaptă să fie preluată", uuid, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export { createUser, checkEmail, checkPhone, verifyUser, getUserByUUID, confirmAcountByUUID, getAllServices, getServiceByUUID, getAllStreets, createOrder, getOrdersByUUID, getAllOpenOrders };
