import jwt from "jsonwebtoken";
import { getUserByUUID } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const token = async (req, res) => {
  const token = req.body.token;

  try {
    let userData = null;
    let decodedData = jwt.verify(token, secret);

    if (decodedData) userData = await getUserByUUID(decodedData.uuid);
    // send user data to the server
    return res.status(200).json({ status: "success", data: userData });
  } catch (err) {
    return res.status(404).json({ status: "error", message: err });
  }
};

export default token;
