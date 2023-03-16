type TVerifyButtonState = {
  firstCalled: boolean;
  activeVerifyCode: boolean;
  theElseCalled: boolean;
  isExceeded: boolean;
  verifyCode: string;
  verifyCodeSignatureNumber: string;
  isExistedAccount: null | 'EMPTY' | 'FILLED';
};

type TFindAccountErrorType = {
  phone: string;
  verifyCode: string;
  email: string;
};
