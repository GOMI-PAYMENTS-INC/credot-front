import React from 'react';
import { Link } from 'react-router-dom';

import { PATH } from '@/router/routeList';
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
  <div className='flex items-center justify-center text-center'>
    <div className='mr-1 text-M/Regular'>{text}</div>
    <Link to={buttonLink}>
      <button className='textButton-primary-default-large-none'>{buttonText}</button>
    </Link>
  </div>
);
