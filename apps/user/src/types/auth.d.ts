type TVerifyButtonState = {
  firstCalled: boolean;
  activeVerifyCode: boolean;
  theElseCalled: boolean;
  isExceeded: boolean;
  verifyCode: string;
  verifyCodeSignatureNumber: string;
  isExistedAccount: null | 'EMPTY' | 'FILLED';
};

type TTermsType = 'useAgree' | 'personalAgree' | 'marketingAgree';

type TTermsCheckState = {
  checkedTerms: TTermsType[] | string[];
  isDetailOpen: number[];
  triggerConfirmEmail: boolean;
  agreedAllTerms: boolean;
  isReadyToSignUp: boolean;
};

type TAuthEssentialProps = {
  email: string;
  password: string;
  confirmedPassword: string;
  phone: string;
  verifyCode: string;
  requiredAgreeTerm: boolean;
};
