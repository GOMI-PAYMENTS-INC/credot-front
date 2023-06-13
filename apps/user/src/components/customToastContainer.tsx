import { ToastContainer, TypeOptions } from 'react-toastify';
import { ReactSVG } from 'react-svg';

// enum STATUS_TYPE {
//   INFORMATIVE = 'INFORMATIVE',
//   WARNING = 'WARNING',
//   POSITIVE = 'POSITIVE',
// }
// type TToastOption = {
//   status: STATUS_TYPE;
//   title: boolean;
//   body: boolean;
//   close: boolean;
// };

export const CustomToastContainer = () => {
  const typeConvert = () => {};

  const iconCustom = (type: TypeOptions) => {
    switch (type) {
      case 'success':
        return (
          <ReactSVG
            src='/assets/icons/outlined/CheckCircle.svg'
            className='cursor-pointer'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'fill-green-600 w-6 h-6');
            }}
          />
        );
      case 'warning':
      case 'error':
        return (
          <ReactSVG
            src='/assets/icons/outlined/Warning.svg'
            className='cursor-pointer'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'fill-red-600 w-6 h-6');
            }}
          />
        );

      default:
        return null;
    }
  };

  const contextClass = {
    success: 'bg-grey-900 text-grey-200',
    error: 'bg-grey-900 text-grey-200',
    info: 'bg-grey-900 text-grey-200',
    warning: 'bg-grey-900 text-grey-200',
    default: 'bg-grey-900 text-grey-200',
    dark: 'bg-grey-900 text-grey-200',
  };

  return (
    <ToastContainer
      icon={({ type }) => iconCustom(type)}
      position='top-center'
      autoClose={3000}
      hideProgressBar
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      limit={1}
      toastClassName={(context) =>
        context
          ? contextClass[context.type || 'default'] +
            ' text-M/Medium relative flex p-3 gap-x-3 rounded-[10px] justify-between overflow-hidden cursor-pointer box-border'
          : ''
      }
      closeButton={false}
    />
  );
};
