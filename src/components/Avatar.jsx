import React from 'react';
import { C, font, fontBody } from '../constants/theme';

/** Avatar component */
export const Avatar = ({ seed, size = 36, border = C.primaryC }) => (
  <div style={{
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    borderRadius: 10,
    border: `2px solid ${border}`,
    backgroundImage: `url(https://api.dicebear.com/7.x/bottts/svg?seed=${seed})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: C.surfaceHi,
    flexShrink: 0,
  }} />
);
