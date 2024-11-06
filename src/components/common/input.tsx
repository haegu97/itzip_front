// React 관련
import { XCircleIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { InputHTMLAttributes } from 'react';

import { InputProps } from '@/types/input';

import { Margin } from './margin';
import resetBtn from '../../../public/icons/common/Ic/vector.png';
import AccentStar from '../auth/accent-star';

export default function Input({
  name,
  errors,
  onClick,
  labelTitle,
  title,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className=" w-full gap-2">
      <div className="relative flex w-full flex-col">
        <div className="flex items-center pb-2">
          <label htmlFor={labelTitle}>{title}</label>
          {title ? <AccentStar /> : ''}
        </div>
        <input
          className="rounded-radius-03 border-none px-[18px] py-spacing-05 ring-1 ring-Grey-400 transition placeholder:text-Grey-600 focus:outline-none focus:ring-2 focus:ring-Blue-400"
          name={name}
          {...rest}
        />
        <button
          className="hover:bg-Grey-10 absolute right-spacing-02 top-3 rounded-full p-1 opacity-0 transition-opacity duration-300 hover:opacity-100"
          onClick={onClick}
        >
          <Image src={resetBtn} width={19} height={19} alt="resetbtn" />
        </button>
      </div>
      <Margin height={'9px'} />
      {errors ? (
        <span className="text-12 font-[500] text-color-text-warning">
          <div className="mt-2 flex items-center gap-[4.5px]">
            <XCircleIcon className="size-[19px]" />
            {errors}
          </div>
        </span>
      ) : (
        ''
      )}
    </div>
  );
}
