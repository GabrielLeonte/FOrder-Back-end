import jwt from "jsonwebtoken";
import { getAllStreets } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const getStreets = async (req, res) => {
  try {
    // check if the auth header is valid
    jwt.verify(req.headers.auth, secret);

    // get product data
    let data = await getAllStreets();

    // return product data to the client
    if (data) return res.status(200).json({ status: "success", data: data });
  } catch (err) {
    return res.status(404).json({ status: "err", message: err });
  }
};

export default getStreets;
