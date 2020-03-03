import jwt from "jsonwebtoken";
import { getProductByPUID } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const getProduct = async (req, res) => {
  try {
    // check if the auth header is valid
    jwt.verify(req.headers.auth, secret);

    // make sure that provided product unique id is a string
    if (String(req.body.puid) === req.body.puid) new Error("You must parse a product unique id");

    // get product data
    let data = await getProductByPUID(req.body.puid);

    // return product data to the client
    if (data) return res.status(200).json({ status: "success", data: data });
  } catch (err) {
    return res.status(200).json({ status: "err", message: err });
  }
};

export default getProduct;
