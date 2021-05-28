import { CHANGE_VERIFY_STEP } from "../constants/verifyConstants";
  
export const verifyStepReducer = (state = { step: "" }, action) => {
	switch (action.type) {
	case CHANGE_VERIFY_STEP:
		return { step: action.payload };
	default:
		return state;
	}
};
