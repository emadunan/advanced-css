import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };

    case "inc":
      return { ...state, count: state.count + state.step };

    case "setCount":
      return { ...state, count: action.payload };

    case "setStep":
      return { ...state, step: action.payload };

    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  function handleState (e) {
    const type = e.target.getAttribute("data-action");
    dispatch({ type, payload: Number(e.target.value) });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={handleState}
          data-action="setStep"
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={handleState} data-action="dec">
          -
        </button>
        <input
          value={state.count}
          onChange={handleState}
          data-action="setCount"
        />
        <button onClick={handleState} data-action="inc">
          +
        </button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={handleState} data-action="reset">
          Reset
        </button>
      </div>
    </div>
  );
}
export default DateCounter;
