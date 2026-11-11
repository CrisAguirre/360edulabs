/**
 * DecryptedText — React Bits (reactbits.dev)
 *
 * Scrambled-character text effect that reveals characters sequentially
 * upon hover or mount, perfect for science agency and terminal themes.
 */
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export interface DecryptedTextProps {
  text: string;
  speed?: number;
  className?: string;
  scrambleChars?: string;
  triggerOnHover?: boolean;
}

const DEFAULT_CHARS = '0123456789!@#$%^&*~-+=<>?';

export function DecryptedText({
  text,
  speed = 45,
  className,
  scrambleChars = DEFAULT_CHARS,
  triggerOnHover = true
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startDecryption = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    if (!triggerOnHover) {
      startDecryption();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, triggerOnHover]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isHovered) {
      setIsHovered(true);
      startDecryption();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-block font-mono tracking-wider', className)}
    >
      {displayText}
    </span>
  );
}

export default DecryptedText;
