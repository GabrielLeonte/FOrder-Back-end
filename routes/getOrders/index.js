import jwt from "jsonwebtoken";
import { getOrdersByUUID } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const getOrders = async (req, res) => {
  try {
    // check if the auth header is valid
    const UserData = jwt.verify(req.headers.auth, secret);

    // get all orders by UserData uuid
    const data = await getOrdersByUUID(UserData.uuid);

    // return product data to the client
    if (data) return res.status(200).json({ status: "success", data: data });
  } catch (err) {
    return res.status(404).json({ status: "err", message: err });
  }
};

export default getOrders;
