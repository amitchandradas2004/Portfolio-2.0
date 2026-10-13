// @ts-nocheck

'use client';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { type HTMLMotionProps, motion } from 'motion/react';
import type React from 'react';
import type { JSX } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

const generateVariants = (
  direction: Direction,
  distance: number,
  delay: number,
  duration: number
): { hidden: any; visible: any } => {
  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y';
  const value = direction === 'right' || direction === 'down' ? distance : -distance;

  return {
    hidden: {
      filter: 'blur(4px)',
      opacity: 0,
      [`translate${axis}`]: value,
      [axis.toLowerCase()]: value,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [`translate${axis}`]: 0,
      [axis.toLowerCase()]: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

interface TextAnimationProps {
  as?: keyof JSX.IntrinsicElements;
  text?: string;
  children?: React.ReactNode;
  classname?: string;
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  variants?: {
    hidden?: any;
    visible?: any;
  };
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  letterAnime?: boolean;
  lineAnime?: boolean;
}

const TextAnimation = ({
  as = 'h1',
  text,
  children,
  classname = '',
  viewport,
  variants,
  direction = 'down',
  distance = 24,
  delay = 0,
  duration = 0.6,
  letterAnime = false,
  lineAnime = true,
}: TextAnimationProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // On small devices, calibrate distance, duration, and delay to match large device pacing
  const effectiveDistance = isDesktop ? distance : Math.max(10, Math.round(distance * 0.5));
  const effectiveDuration = isDesktop ? duration : Math.max(0.85, duration * 1.4);
  const effectiveDelay = isDesktop ? delay : delay * 1.35;
  const effectiveViewport = viewport || { amount: isDesktop ? 0.2 : 0.1, margin: '0px 0px 0px 0px' };

  const baseVariants = variants || generateVariants(direction, effectiveDistance, effectiveDelay, effectiveDuration);
  const modifiedVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
    },
  };

  const MotionComponent = (motion[as as keyof typeof motion] || motion.div) as React.ComponentType<
    HTMLMotionProps<any>
  >;

  // When children provided, animate as full block
  if (children) {
    return (
      <MotionComponent
        whileInView="visible"
        initial="hidden"
        variants={modifiedVariants}
        viewport={effectiveViewport}
        className={cn('inline-block text-foreground', classname)}
      >
        {children}
      </MotionComponent>
    );
  }

  const safeText = text || '';

  // Full scrolling text animation (lineAnime = true)
  if (lineAnime) {
    return (
      <MotionComponent
        whileInView="visible"
        initial="hidden"
        variants={modifiedVariants}
        viewport={effectiveViewport}
        className={cn('inline-block text-foreground', classname)}
      >
        {safeText}
      </MotionComponent>
    );
  }

  // Word/letter staggered animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isDesktop ? 0.08 : 0.12,
        delayChildren: effectiveDelay,
      },
    },
  };

  return (
    <MotionComponent
      whileInView="visible"
      initial="hidden"
      variants={containerVariants}
      viewport={effectiveViewport}
      className={cn('inline-block text-foreground', classname)}
    >
      {safeText.split(' ').map((word: string, index: number) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          variants={letterAnime ? { visible: { transition: { staggerChildren: 0.03 } } } : modifiedVariants}
        >
          {letterAnime ? (
            <>
              {word.split('').map((letter: string, letterIndex: number) => (
                <motion.span
                  key={letterIndex}
                  className="inline-block"
                  variants={modifiedVariants}
                >
                  {letter}
                </motion.span>
              ))}
              &nbsp;
            </>
          ) : (
            <>{word}&nbsp;</>
          )}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

export default TextAnimation;
