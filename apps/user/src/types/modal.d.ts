interface ICancelClickEvent {
  name: string;
  cancelEvent: () => void | Promise<void>;
}
interface IConfirmClickEvent {
  name: string;
  confirmEvent: () => void | Promise<void>;
}
interface IModalType {
  title: string | JSX.Element;
  content: JSX.Element;
  onCancel: ICancelClickEvent;
  onConfirm?: IConfirmClickEvent;
}
