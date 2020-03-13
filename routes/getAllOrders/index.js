import jwt from "jsonwebtoken";
import { getAllOpenOrders } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const getAllOrders = async (req, res) => {
  try {
    // check if the auth header is valid
    let UserData = jwt.verify(req.headers.auth, secret);

    // get all open orders
    const data = await getAllOpenOrders(UserData.uuid);

    // return product data to the client
    if (data) return res.status(200).json({ status: "success", data: data });
  } catch (err) {
    return res.status(404).json({ status: "err", message: err });
  }
};

export default getAllOrders;
