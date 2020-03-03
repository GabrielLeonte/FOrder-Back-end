import jwt from "jsonwebtoken";
import { getAllServices } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const getServices = async (req, res) => {
  try {
    // check if the auth header is valid
    jwt.verify(req.headers.auth, secret);

    // get product data
    let data = await getAllServices();

    // return product data to the client
    if (data) return res.status(200).json({ status: "success", data: data });
  } catch (err) {
    return res.status(200).json({ status: "err", message: err });
  }
};

export default getServices;
