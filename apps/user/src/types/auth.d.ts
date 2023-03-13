type TVerifyButtonState = {
  firstCalled: boolean;
  theElseCalled: boolean;
  isExceeded: boolean;
  verifyCode: string;
};

type TFindAccountErrorType = {
  phone: string;
  verifyCode: string;
};
