import React from 'react';
import { C, font, fontBody } from '../constants/theme';

export const RankBadge = ({ rank }) => {
  const colors = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };
  return (
    <span style={{
      position: 'absolute', bottom: -4, right: -4,
      width: 16, height: 16, borderRadius: '50%',
      background: colors[rank] || C.primaryC,
      border: '2px solid ' + C.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 7, fontWeight: 900, color: rank <= 2 ? '#000' : '#fff',
      fontFamily: font,
    }}>{rank}</span>
  );
};
