type TVerifyButtonState = {
  firstCalled: boolean;
  activeVerifyCode: boolean;
  theElseCalled: boolean;
  isExceeded: boolean;
  verifyCode: string;
  verifyCodeSignatureNumber: string;
  isExistedAccount: null | 'EMPTY' | 'FILLED';
};

type TAuthEssentialProps = {
  phone: string;
  verifyCode: string;
  email: string;
  password: string;
  requiredAgreeTerm: boolean;
  confirmPassword: string;
};
