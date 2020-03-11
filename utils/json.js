import { isEmpty } from "lodash";
import { Validator } from "jsonschema";
import { createOrderSchema } from "./jsonSchema";

const jsonValidator = new Validator();

const validateOrder = async array => {
  return new Promise((resolve, reject) => {
    // make sure that an json object is provided
    if (isEmpty(array)) reject("Te rog furnizează un obiect de tip JSON");

    // validate the json
    const data = jsonValidator.validate(array, createOrderSchema);

    // check for errors
    if (isEmpty(data.errors)) resolve(true);
    else reject("A apărut o eroare la validarea requestului, dacă eroarea persistă te rog contactează un administrator");
  });
};

export { validateOrder };
