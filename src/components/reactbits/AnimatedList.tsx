/**
 * AnimatedList — React Bits (reactbits.dev)
 *
 * Staggered-reveal list container that smoothly animates items into view
 * sequentially using framer-motion.
 */
import { Children, isValidElement, type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface AnimatedListProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  initialY?: number;
  duration?: number;
}

export function AnimatedList({
  children,
  className,
  stagger = 0.08,
  initialY = 12,
  duration = 0.35
}: AnimatedListProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: initialY },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn('space-y-3', className)}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        return <motion.div variants={itemVariants}>{child}</motion.div>;
      })}
    </motion.div>
  );
}

export default AnimatedList;
