import {
  CHANGE_VERIFY_STEP,
  CHECK_CONTACT_REQUEST,
  CHECK_CONTACT_SUCCESS,
  CHECK_CONTACT_FAIL,
  CHECK_CONTACT_RESET,
  CHECK_USERNAME_REQUEST,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_FAIL,
  CHECK_USERNAME_RESET,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
  USER_VERIFY_RESET,
  CODE_VERIFY_REQUEST,
  CODE_VERIFY_SUCCESS,
  CODE_VERIFY_FAIL,
  CODE_VERIFY_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_RESET,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_RESET,
  // USER_DETAILS_SUCCESS,
  // USER_DETAILS_FAIL,
  // USER_DETAILS_REQUEST,
  // USER_DETAILS_RESET,
  // USER_UPDATE_PROFILE_REQUEST,
  // USER_UPDATE_PROFILE_SUCCESS,
  // USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';

export const userStepReducer = (state = { step: 'EntryForm' }, action) => {
  switch (action.type) {
    case CHANGE_VERIFY_STEP:
      return { step: action.payload };
    default:
      return state;
  }
};

export const checkContactReducer = (state = { checkResult: {} }, action) => {
  switch (action.type) {
    case CHECK_CONTACT_REQUEST:
      return { loading: true, ...state };
    case CHECK_CONTACT_SUCCESS:
      return { loading: false, success: true, checkResult: action.payload };
    case CHECK_CONTACT_FAIL:
      return { loading: false, error: action.payload };
    case CHECK_CONTACT_RESET:
      return {};
    default:
      return state;
  }
};

export const checkUserNameReducer = (state = { checkResult: {} }, action) => {
  switch (action.type) {
    case CHECK_USERNAME_REQUEST:
      return { loading: true, ...state };
    case CHECK_USERNAME_SUCCESS:
      return { loading: false, success: true, checkResult: action.payload };
    case CHECK_USERNAME_FAIL:
      return { loading: false, error: action.payload };
    case CHECK_USERNAME_RESET:
      return {};
    default:
      return state;
  }
};

export const userVerifyReducer = (state = { verifyData: {} }, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true, ...state };
    case USER_VERIFY_SUCCESS:
      return { loading: false, success: true, verifyData: action.payload };
    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    case USER_VERIFY_RESET:
      return {};
    default:
      return state;
  }
};

export const codeVerifyReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CODE_VERIFY_REQUEST:
      return { loading: true };
    case CODE_VERIFY_SUCCESS:
      return { loading: false, success: true };
    case CODE_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    case CODE_VERIFY_RESET:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, resetPass: action.payload };
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_FORGOT_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userSetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, resetPass: action.payload };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
