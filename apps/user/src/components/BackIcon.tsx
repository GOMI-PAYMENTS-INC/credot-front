import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

export const BackIcon = () => {
  const navigation = useNavigate();
  return isMobile ? (
    <svg
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_3665_1287)'>
        <circle cx='26' cy='24' r='20' fill='#FCFCFC' />
        <circle cx='26' cy='24' r='19.5' stroke='#EBEBEB' />
      </g>
      <path
        d='M28.9495 16.4193L30.0578 17.5673C30.137 17.6464 30.137 17.7652 30.0578 17.8443L24.0016 23.9006L30.0578 29.9568C30.137 30.036 30.137 30.1548 30.0578 30.2339L28.9495 31.3423C28.8703 31.4214 28.7516 31.4214 28.6724 31.3423L21.3495 24.0193C21.2703 23.9402 21.2703 23.8214 21.3495 23.7423L28.6724 16.4193C28.7516 16.3798 28.8703 16.3798 28.9495 16.4193Z'
        fill='#8C8C8C'
      />
      <defs>
        <filter
          id='filter0_d_3665_1287'
          x='0'
          y='0'
          width='52'
          height='52'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='3' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_3665_1287'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_3665_1287'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  ) : (
    <svg
      className='cursor-pointer'
      onClick={() => navigation('/breakdown')}
      width='64'
      height='64'
      viewBox='0 0 64 64'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_3665_1287)'>
        <circle cx='32' cy='30' r='26' fill='#FCFCFC' />
        <circle cx='32' cy='30' r='25.5' stroke='#EBEBEB' />
      </g>
      <path
        d='M35.0938 21.0561L36.4938 22.5061C36.5938 22.6061 36.5938 22.7561 36.4938 22.8561L28.8438 30.5061L36.4938 38.1561C36.5938 38.2561 36.5938 38.4061 36.4938 38.5061L35.0938 39.9061C34.9938 40.0061 34.8438 40.0061 34.7438 39.9061L25.4938 30.6561C25.3938 30.5561 25.3938 30.4061 25.4938 30.3061L34.7438 21.0561C34.8438 21.0061 34.9938 21.0061 35.0938 21.0561Z'
        fill='#8C8C8C'
      />
      <defs>
        <filter
          id='filter0_d_3665_1287'
          x='0'
          y='0'
          width='64'
          height='64'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='3' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_3665_1287'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_3665_1287'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
