const LoadHttp = app => {
  app.get("/", require("../routes/").default);
  app.post("/login", require("../routes/login").default);
  app.post("/signup", require("../routes/signup").default);
  app.post("/token", require("../routes/token").default);
  app.post("/getServices", require("../routes/getServices").default);
  app.post("/generateConfirmationCode", require("../routes/generateConfirmationCode").default);
  app.post("/confirmAccount", require("../routes/confirmAccount").default);
  app.post("/getService", require("../routes/getService").default);
  app.post("/getStreets", require("../routes/getStreets").default);
  app.post("/createOrder", require("../routes/createOrder").default);
  app.post("/getOrders", require("../routes/getOrders").default);
  app.post("/getAllOrders", require("../routes/getAllOrders").default);
};

export { LoadHttp };
