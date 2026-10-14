'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ButtonCreativeRightProps {
  href?: string;
  text?: string;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function ButtonCreativeRight({
  href,
  text = 'Download Resume',
  target = '_blank',
  rel = 'noopener noreferrer',
  className = '',
  onClick,
  ariaLabel = 'Download Resume',
}: ButtonCreativeRightProps) {
  const innerContent = (
    <>
      <span className="translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block z-10 font-semibold">
        {text}
      </span>
      <div className="flex gap-2 text-white dark:group-hover:text-black z-20 items-center absolute inset-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 font-semibold">
        <span>{text}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </div>
      <div className="absolute top-[40%] left-[14%] h-2 w-2 group-hover:h-full group-hover:w-full rounded-full bg-black dark:bg-white scale-[1] dark:group-hover:bg-[#e7cb6e] group-hover:bg-[#263381] group-hover:scale-[2.5] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] z-0 pointer-events-none"></div>
    </>
  );

  const sharedClasses = `group relative cursor-pointer flex h-12 w-full sm:w-[205px] items-center justify-center border-2 dark:border-[#656fe2] border-[#394481] bg-white dark:bg-[#070e41] rounded-full overflow-hidden text-slate-900 dark:text-white text-center font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-300 select-none ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={sharedClasses}
        onClick={onClick}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={sharedClasses}
    >
      {innerContent}
    </button>
  );
}
