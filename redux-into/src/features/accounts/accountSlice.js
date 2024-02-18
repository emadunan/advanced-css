const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const host = "api.frankfurter.app";

export default function accountReducer(
  state = initialStateAccount,
  { type, payload }
) {
  switch (type) {
    case "account/loading":
      return { ...state, isLoading: true };

    case "account/deposit":
      return { ...state, isLoading: false, balance: state.balance + payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: payload.amount,
        loanPurpose: payload.purpose,
        balance: state.balance + payload.amount,
      };

    case "account/payLoan":
      if (state.loan === 0) return;

      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      // In Redux unlike normal reducers:
      // It's adviced to return current state in case of unknown action.
      // throw new Error("Unknown action type: " + type);
      return state;
  }
}

export function deposit(amount, currency) {
  console.log(amount, currency);
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/loading" });

    // API call
    const response = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await response.json();
    const converted = data.rates.USD;

    // Finally dispatch the action after the async requests
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
