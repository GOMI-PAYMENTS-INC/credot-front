import React from 'react';
import { Link } from 'react-router-dom';

import { PATH } from '@/types/enum.code';
import { ICommon1SectionProps } from '@/components/layouts';
export interface IFindIdPasswordBottomProps {
  text: string;
  buttonText: string;
  buttonLink: string;
}
export const FindIdPasswordBottom = ({
  text,
  buttonText,
  buttonLink,
}: IFindIdPasswordBottomProps) => (
  <div className='mt-10 flex items-center justify-center text-center'>
    <div className='mr-1 text-M/Regular text-grey-700'>{text}</div>
    <Link to={buttonLink}>
      <button className='textButton-primary-default-large-none'>{buttonText}</button>
    </Link>
  </div>
);
