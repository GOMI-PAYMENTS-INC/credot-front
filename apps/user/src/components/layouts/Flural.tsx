import { ReactNode } from 'react';

export interface IFluralProps {
  //   leftNode: ReactNode;
  //   rightNode: ReactNode;
  children?: ReactNode;
}
// const Flural: FC<IFluralProps> = ({ leftNode, rightNode }) => (
export const Flural = ({ children }: IFluralProps) => (
  <div className='container'>
    <div className='grid min-w-[1320px] grid-cols-12 gap-x-6'>{children}</div>
  </div>
);
