interface ICancelClickEvent {
  name: string;
  cancelEvent: () => void;
}
interface IConfirmClickEvent {
  name: string;
  confirmEvent: () => void;
}
interface IModalType {
  title: string | JSX.Element;
  content: JSX.Element;
  onCancel: ICancelClickEvent;
  onConfirm?: IConfirmClickEvent;
}
