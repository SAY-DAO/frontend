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
  USER_REGISTER_RESET,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  IP_LOCATION_REQUEST,
  IP_LOCATION_SUCCESS,
  IP_LOCATION_FAIL,
  IP_LOCATION_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_MONTHLY_CAMPAIGN_UPDATE_REQUEST,
  USER_MONTHLY_CAMPAIGN_UPDATE_FAIL,
  USER_MONTHLY_CAMPAIGN_UPDATE_SUCCESS,
  USER_MONTHLY_CAMPAIGN_UPDATE_RESET,
  USER_NEWS_LETTER_CAMPAIGN_UPDATE_REQUEST,
  USER_NEWS_LETTER_CAMPAIGN_UPDATE_FAIL,
  USER_NEWS_LETTER_CAMPAIGN_UPDATE_SUCCESS,
  USER_NEWS_LETTER_CAMPAIGN_UPDATE_RESET,
  USER_UPDATE_PROFILE_RESET,
  USER_MONTHLY_CAMPAIGN_REQUEST,
  USER_MONTHLY_CAMPAIGN_SUCCESS,
  USER_MONTHLY_CAMPAIGN_FAIL,
} from '../constants/main/userConstants';

export const userStepReducer = (state = { step: 'EntryForm' }, action) => {
  switch (action.type) {
    case CHANGE_VERIFY_STEP:
      return { step: action.payload };
    default:
      return state;
  }
};

export const ipLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case IP_LOCATION_REQUEST:
      return { loading: true, success: false, ...state };
    case IP_LOCATION_SUCCESS:
      return { loading: false, success: true, ipResult: action.payload };
    case IP_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    case IP_LOCATION_RESET:
      return {};
    default:
      return state;
  }
};

export const checkContactReducer = (state = { checkResult: {} }, action) => {
  switch (action.type) {
    case CHECK_CONTACT_REQUEST:
      return { loading: true, success: false, ...state };
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
      return { loading: true, success: false, ...state };
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

export const userVerifyReducer = (state = { verifyInfo: {} }, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true, success: false };
    case USER_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,

        verifyInfo: action.payload,
      };
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

export const userRegisterReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, success: false };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, success: true, theUser: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true, success: false };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, forgotPass: action.payload };
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_FORGOT_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userResetPasswordReducer = (state = {}, action) => {
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

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, updatedUser: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userCampaignsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_MONTHLY_CAMPAIGN_REQUEST:
      return { ...state, loading: true };
    case USER_MONTHLY_CAMPAIGN_SUCCESS:
      return { loading: false, success: true, statuses: action.payload };
    case USER_MONTHLY_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    case USER_MONTHLY_CAMPAIGN_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_MONTHLY_CAMPAIGN_UPDATE_SUCCESS:
      return { loading: false, success: true, updatedMonthlyStatus: action.payload };
    case USER_MONTHLY_CAMPAIGN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_MONTHLY_CAMPAIGN_UPDATE_RESET:
      return {};
    case USER_NEWS_LETTER_CAMPAIGN_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_NEWS_LETTER_CAMPAIGN_UPDATE_SUCCESS:
      return { loading: false, success: true, updatedNewsLetterStatus: action.payload };
    case USER_NEWS_LETTER_CAMPAIGN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_NEWS_LETTER_CAMPAIGN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
