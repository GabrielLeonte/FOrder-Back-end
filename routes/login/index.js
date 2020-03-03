import jwt from "jsonwebtoken";
import { verifyUser } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const login = async (req, res) => {
  // define user object
  const user = { email: req.body.email, password: req.body.password };

  // check for empty data
  if (!user.email || !user.password) return res.status(404).json({ status: "error", message: "Te rog să completezi toate câmpurile necesare!" });

  try {
    // accessToken variable
    let accessToken = null;

    // verify the user
    let validCredentials = await verifyUser(user.email, user.password);

    // create a auth token
    if (validCredentials) accessToken = jwt.sign({ uuid: validCredentials }, secret);

    // send the auth token to the client
    return res.status(200).json({ status: "success", token: accessToken });
  } catch (err) {
    // send any catched error to the client
    return res.status(404).json({ status: "error", message: err });
  }
};

export default login;
