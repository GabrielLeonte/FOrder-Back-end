const createOrderSchema = {
  type: "object",
  properties: {
    serviceID: { type: "integer" },
    street: { type: "string" },
    description: { type: "string" },
    contact_phone: { type: "integer" },
    contact_firstname: { type: "string" },
    contact_lastname: { type: "string" },
    house_number: { type: "integer" },
    block_number: { type: "string" },
    apartment_number: { type: "integer" },
    offer: { type: "integer", minimum: 1 }
  },
  required: ["serviceID", "street", "description", "contact_phone", "contact_firstname", "contact_lastname", "house_number", "block_number", "apartment_number", "offer"]
};

export { createOrderSchema };
