import jwt from "jsonwebtoken";
import { getUserByUUID } from "../../utils/database";
import { generateConfirmationCodeEmail } from "../../utils/email";

// JWT Private Key from env file
const secret = process.env.JWT_LOGIN_SECRET;

const generateConfirmationCode = async (req, res) => {
  try {
    // check if the auth header is valid
    let data = await jwt.verify(req.headers.auth, secret);
    let userEmail = await getUserByUUID(data.uuid);
    let code = await generateConfirmationCodeEmail(userEmail);

    // send back to the client the confirmation code
    res.status(200).json({
      status: "success",
      data: {
        code: code
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err
    });
  }
};

export default generateConfirmationCode;
