const mail = require("@sendgrid/mail");
mail.setApiKey(process.env.SENDGRID_API_KEY);

const signUpEmail = async (email, token) => {
  return new Promise((resolve, reject) => {
    const msg = {
      to: email,
      from: "noreply@falticeniorder.ro",
      subject: "Confirmation Email",
      html: `Salut, folosind acest link iti poti confirma contul ${token}`
    };

    try {
      mail.send(msg);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

const generateConfirmationCodeEmail = async email => {
  return new Promise((resolve, reject) => {
    // generate random 4 digit code
    const code = Math.floor(1000 + Math.random() * 9000);

    // basic email template
    const msg = {
      to: email,
      from: "noreply@falticeniorder.ro",
      subject: "Emailul de activare",
      html: `Salut, folosind acest cod iti poti activa contul ${code}`
    };

    try {
      mail.send(msg);
      resolve(code);
    } catch (err) {
      reject(err);
    }
  });
};

export { signUpEmail, generateConfirmationCodeEmail };
