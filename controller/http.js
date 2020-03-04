const LoadHttp = app => {
  app.get("/", require("../routes/").default);
  app.post("/login", require("../routes/login").default);
  app.post("/signup", require("../routes/signup").default);
  app.post("/token", require("../routes/token").default);
  app.post("/getFood", require("../routes/getFood").default);
  app.post("/getProduct", require("../routes/getProduct").default);
  app.post("/getServices", require("../routes/getServices").default);
  app.post("/generateConfirmationCode", require("../routes/generateConfirmationCode").default);
  app.post("/confirmAccount", require("../routes/confirmAccount").default);
  app.post("/getService", require("../routes/getService").default);
};

export { LoadHttp };
