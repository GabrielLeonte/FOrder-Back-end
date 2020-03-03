import jwt from "jsonwebtoken";
import { confirmAcountByUUID } from "../../utils/database";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const confirmAccount = async (req, res) => {
  try {
    // check if the auth header is valid and get some data of
    let data = await jwt.verify(req.headers.auth, secret);
    confirmAcountByUUID(data.uuid);

    // send back to the client a success response
    res.status(200).json({
      status: "success"
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err
    });
  }
};

export default confirmAccount;
