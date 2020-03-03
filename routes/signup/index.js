import md5 from "md5";
import uuid from "uuid/v1";
import confirmationToken from "uuid/v4";
import { checkEmail, createUser, checkPhone } from "../../utils/database";
import { signUpEmail } from "../../utils/email";

const signup = async (req, res) => {
  // user object
  let user = {
    user_unique_id: uuid(),
    email: req.body.email,
    phone: req.body.phone,
    password: md5(req.body.password),
    created_at: new Date().getTime(),
    confirmation_token: confirmationToken()
  };

  // check for empty data
  if (!user.email || !user.phone || !user.password) return res.status(404).json({ status: "error", message: "Te rog să completezi toate câmpurile necesare!" });

  // try to send the email and insert user into the database
  try {
    let emailIsUnique = await checkEmail(user.email);
    let phoneisUnique = await checkPhone(user.phone);
    let userStatus, emailStatus;

    if (emailIsUnique && phoneisUnique) {
      userStatus = await createUser(user);
    }
    if (userStatus) {
      return res.status(200).json({ status: "success" });
    }
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err
    });
  }
};

export default signup;
