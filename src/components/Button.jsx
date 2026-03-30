import React from 'react';
import { C, fontBody } from '../constants/theme';

/**
 * Button component used throughout the app.
 * Props:
 * - children: button label
 * - onClick: click handler
 * - variant: 'primary' | 'secondary' | 'ghost'
 * - disabled: boolean
 */
export const Button = ({ children, onClick, variant = 'primary', disabled }) => {
  const baseStyle = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    fontFamily: fontBody,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '10px 20px',
    borderRadius: 12,
    transition: 'all 0.15s',
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`,
      color: '#fff',
      boxShadow: `0 4px 15px rgba(236,72,153,0.3)`,
    },
    secondary: {
      background: C.surfaceLow,
      color: C.onSurface,
      border: `1px solid ${C.outlineV}`,
    },
    ghost: {
      background: 'transparent',
      color: C.outline,
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant] }}
    >
      {children}
    </button>
  );
};
