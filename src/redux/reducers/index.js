import { combineReducers } from '@reduxjs/toolkit';
import {
  userStepReducer,
  checkContactReducer,
  checkUserNameReducer,
  userVerifyReducer,
  codeVerifyReducer,
  userLoginReducer,
  userRegisterReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  userDetailsReducer,
  ipLocationReducer,
  userUpdateReducer,
  userCampaignsReducer,
} from './userReducer';
import {
  childRandomSearchReducer,
  myChildReducer,
  childNeedsReducer,
  childOneNeedReducer,
  childOneNeedReceiptReducer,
  childByTokenReducer,
} from './childReducer';

import homeReducer from './homeReducer';
import { checkCartPaymentReducer, paymentReducer } from './paymentReducder';
import { cartAddReducer, cartUpdateReducer, cartBadgeReducer } from './cartReducer';
import {
  acceptInvitationReducer,
  familyNetworksReducer,
  invitationReducer,
  joinVirtualFamilyReducer,
  LeaveVirtualFamilyReducer,
} from './familyReducer';
import {
  signatureReducer,
  readyToSignNeedsReducer,
  readyToSignOneNeedReducer,
  walletInformationReducer,
  walletVerifyReducer,
  walletNonceReducer,
  ecosystemAnalyticReducer,
  contributionReducer,
  signatureVerificationReducer,
  ecosystemMintAnalyticReducer,
  needVariablesAnalyticReducer,
} from './daoReducer';
import allNeedsReducer from './needReducer';
import themeReducer from './themeReducer';
import { commentReducer } from './commentReducer';

export default combineReducers({
  themeOptions: themeReducer,
  ipLocation: ipLocationReducer,
  commentResult: commentReducer,
  ecosystemData: ecosystemAnalyticReducer,
  ecosystemMintData: ecosystemMintAnalyticReducer,
  needVariables: needVariablesAnalyticReducer,
  walletNonce: walletNonceReducer,
  walletVerify: walletVerifyReducer,
  walletInformation: walletInformationReducer,
  signature: signatureReducer,
  signatureVerification: signatureVerificationReducer,
  paidNeeds: readyToSignNeedsReducer,
  readySigningOneNeed: readyToSignOneNeedReducer,
  familyNetwork: familyNetworksReducer,
  verifyStep: userStepReducer,
  checkContact: checkContactReducer,
  checkUserName: checkUserNameReducer,
  userVerifyInfo: userVerifyReducer,
  userVerifyCode: codeVerifyReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userForgotPass: userForgotPasswordReducer,
  userResetPass: userResetPasswordReducer,
  userUpdateProfile: userUpdateReducer,
  userCampaigns: userCampaignsReducer,
  childRandomSearch: childRandomSearchReducer,
  childByToken: childByTokenReducer,
  joinResult: joinVirtualFamilyReducer,
  leftFamily: LeaveVirtualFamilyReducer,
  invite: invitationReducer,
  acceptInvite: acceptInvitationReducer,
  myHome: homeReducer,
  myChild: myChildReducer,
  allNeeds: allNeedsReducer,
  childNeeds: childNeedsReducer,
  childOneNeed: childOneNeedReducer,
  childOneNeedReceipt: childOneNeedReceiptReducer,
  theCart: cartAddReducer,
  cartBadge: cartBadgeReducer,
  shaparakGate: paymentReducer,
  cartUpdate: cartUpdateReducer,
  cartPayCheck: checkCartPaymentReducer,
  ecoContribution: contributionReducer,
});
