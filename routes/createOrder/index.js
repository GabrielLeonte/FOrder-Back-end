import jwt from "jsonwebtoken";
import uuid from "uuid/v1";
import { getServiceByUUID, createOrder } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const createOrder_route = async (req, res) => {
  try {
    // check if the auth header is valid and get data from jwt token
    const UserData = jwt.verify(req.headers.auth, secret);

    // get Order Data from post request
    const OrderData = req.body;

    // make sure that each parameter exists
    if (!OrderData.service || !OrderData.street || !OrderData.description || !OrderData.firstname || !OrderData.lastname || !OrderData.houseNumber || !OrderData.blockNumber || !OrderData.apartmentNumber || (!OrderData.offe && OrderData.offe > 0)) throw "Te rog asigurate ca toate campurile sunt completate";

    // get some required data
    const serviceName = await getServiceByUUID(OrderData.service);
    const timestamp = new Date().getTime();
    const id = uuid();

    // insert data into the database
    await createOrder(id, timestamp, serviceName.name, OrderData.description, OrderData.lastname, OrderData.houseNumber, OrderData.blockNumber, OrderData.apartmentNumber, Number(OrderData.offer), UserData.uuid, null, "Se așteaptă să fie preluată", null);

    // return a success status
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: "err", message: err });
  }
};

export default createOrder_route;
