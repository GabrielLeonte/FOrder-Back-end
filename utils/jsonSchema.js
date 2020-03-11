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
    offer: { type: "integer" }
  }
};

export { createOrderSchema };
