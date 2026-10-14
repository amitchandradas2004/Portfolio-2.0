'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonCrossArrowProps {
  href?: string;
  text?: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function ButtonCrossArrow({
  href = '#contact',
  text = 'Contact me',
  className = '',
  onClick,
  ariaLabel = 'Contact me',
}: ButtonCrossArrowProps) {
  const innerContent = (
    <>
      <span className="pl-5 text-sm sm:text-base font-semibold">{text}</span>
      <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full mr-1 sm:mr-1.5 flex items-center justify-center shrink-0 bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 dark:border-sky-400/30 group-hover:bg-sky-500/20 dark:group-hover:bg-sky-500/25 transition-colors duration-200">
        <div className="absolute top-[0.6em] sm:top-[0.7em] left-[-0.1em] grid place-content-center transition-all w-full h-full duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 fill-sky-600 dark:fill-sky-400 transition-colors"
          >
            <path
              d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 mb-1 -translate-x-4 fill-sky-600 dark:fill-sky-400 transition-colors"
          >
            <path
              d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );

  const sharedClasses = cn(
    'group relative flex h-12 w-auto min-w-[135px] sm:w-[170px] items-center justify-between rounded-full font-semibold transition-all duration-300 cursor-pointer select-none backdrop-blur-xl',
    'bg-white/70 hover:bg-white/95 text-slate-800 border border-slate-300/80 hover:border-sky-500/60 shadow-xs hover:shadow-md hover:shadow-sky-500/10',
    'dark:bg-slate-900/70 dark:hover:bg-slate-900/95 dark:text-white dark:border-slate-800 dark:hover:border-sky-500/50 dark:shadow-xs dark:hover:shadow-md dark:hover:shadow-sky-500/15',
    className
  );

  if (href) {
    return (
      <Link
        href={href}
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
      aria-label={ariaLabel}
      className={sharedClasses}
      onClick={onClick}
    >
      {innerContent}
    </button>
  );
}
