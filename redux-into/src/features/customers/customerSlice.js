const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function customerReducer(state = initialStateCustomer, { type, payload }) {
  switch (type) {
    case "customer/createCustomer":
      return { ...state, ...payload };

    case "customer/updateName":
      return { ...state, fullName: payload };

    default:
      return state;
  }
}

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

export { createCustomer, updateName };

export default customerReducer;
