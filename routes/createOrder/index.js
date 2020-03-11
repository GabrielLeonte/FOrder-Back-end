import jwt from "jsonwebtoken";
import uuid from "uuid/v1";
import { getServiceByUUID, createOrder } from "../../utils/database";
import { validateOrder } from "../../utils/json";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const createOrder_route = async (req, res) => {
  try {
    // check if the auth header is valid and get data from jwt token
    const UserData = jwt.verify(req.headers.auth, secret);

    // get Order Data from post request
    const OrderData = req.body;

    // check for empty fields
    await validateOrder(OrderData);

    // get some required data
    const serviceData = await getServiceByUUID(OrderData.serviceID);
    const timestamp = new Date().getTime();
    const id = uuid();

    // insert data into the database
    await createOrder(id, timestamp, serviceData.name, OrderData.description, OrderData.contact_phone, OrderData.contact_firstname, OrderData.contact_lastname, OrderData.house_number, OrderData.block_number, OrderData.apartment_number, Number(OrderData.offer), UserData.uuid, null, "Se așteaptă să fie preluată", null);

    // return a success status
    res.status(200).json({ status: "success", id: id });
  } catch (err) {
    return res.status(404).json({ status: "err", message: err });
  }
};

export default createOrder_route;
