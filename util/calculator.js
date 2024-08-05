export const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
};

export const handleNumber = (value, state) => {
    //if no currentValue simply start with new value
    if (state.currentValue === "0"){
        return { currentValue: `${value}` };
    }
    //Handles concatenating the previous number with the current number
    return {
        currentValue: `${state.currentValue}${value}`,
    };
}

const handleEqual = (state) =>{
    const {currentValue, previousValue, operator} = state;
    const previous = parseFloat(currentValue);
    const current = parseFloat(previousValue);
    const resetState = {operator:null, previousValue:null}
    switch (operator) {
        case "+":
            return {
                currentValue: `${previous + current} +`,
                ...resetState,
            };
        case "/":
            return {
                currentValue: `${previous / current} +`,
                ...resetState,
            };
        case "*":
            return {
                currentValue: `${previous * current} +`,
                ...resetState,
            }
        case "-":
            return {
                currentValue: `${previous - current} +`,
                ...resetState,
            }
        default:
            return state;

    }
}

const handleCompound = (state) =>{
    const {currentValue, previousValue, operator} = state;
    const previous = parseFloat(currentValue);
    const current = parseFloat(previousValue);
    const resetState = {previousValue:null}
    const simState = {currentV: (current * previous), previousV: previous, op: operator}
    switch (operator) {
        case "+":
            return {
                currentValue: `${previous + current} +`,
                ...resetState,
            };
        case "/":
            return {
                currentValue: `${previous / current} +`,
                ...resetState,
                console.log(state),
            };
        case "*":
            console.log(simState)
            return {
                currentValue: `${previous * current} +`,
                ...resetState,
            }
        case "-":
            return {
                currentValue: `${previous - current} +`,
                ...resetState,
            }
        default:
            return state;

    }
}

//main calc logic
const calculator = (type, value, state) => {
    switch (type) {
        case "number":
            return handleNumber(value, state);
        case "clear":
            return initialState;
        case "operator":
            if (state.operator !== null) {
                return handleCompound(state);
            }else {
                return {
                    currentValue: "0",
                    operator: value,
                    previousValue: state.currentValue,
                }
            }
        case "posneg":
            return {
                currentValue: `${parseFloat(state.currentValue) * -1}`,
            }
        case "percentage":
            return {
                currentValue: `${parseFloat(state.currentValue) * .01}`,
            }
        case "equal":
            return handleEqual(state)
        default:
            return state;
    }
}

export default calculator;