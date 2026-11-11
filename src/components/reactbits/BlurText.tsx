/**
 * BlurText — React Bits (reactbits.dev)
 *
 * Progressive text entrance where words or letters transition from blurred
 * to crisp clarity in a staggered sequence.
 */
import { motion, type Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
}

export function BlurText({
  text,
  delay = 0,
  className,
  animateBy = 'words'
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animateBy === 'words' ? 0.08 : 0.03,
        delayChildren: delay
      }
    }
  };

  const childVariants: Variants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: 6
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn('inline-flex flex-wrap gap-x-[0.3em]', className)}
    >
      {elements.map((el, i) => (
        <motion.span
          key={`${el}-${i}`}
          variants={childVariants}
          className="inline-block will-change-[filter,transform,opacity]"
        >
          {el === ' ' ? '\u00A0' : el}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default BlurText;
