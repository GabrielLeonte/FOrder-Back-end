import jwt from "jsonwebtoken";
import { getServiceByUUID } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const getService = async (req, res) => {
  try {
    // check if the auth header is valid
    jwt.verify(req.headers.auth, secret);

    if (!req.body.service) throw "Please parse a valid service ID";

    // get product data
    let data = await getServiceByUUID(req.body.service);

    // return product data to the client
    if (data) return res.status(200).json({ status: "success", data: data });
  } catch (err) {
    return res.status(404).json({ status: "err", message: err });
  }
};

export default getService;
