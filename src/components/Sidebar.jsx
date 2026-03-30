import React from 'react';
import { C, font, fontBody } from '../constants/theme';
import { LayoutDashboard, Share2, Database, Settings, Cpu, LogOut, Activity } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { profile, logout } = useAppContext();
  const items = [
    { id: 'dashboard', icon: <LayoutDashboard size={16} />, label: 'OVERVIEW' },
    { id: 'path',      icon: <Cpu size={16} />,           label: 'COGNITIVE PATH' },
    { id: 'links',     icon: <Share2 size={16} />,        label: 'NEURAL LINKS' },
    { id: 'kb',        icon: <Database size={16} />,      label: 'KNOWLEDGE BASE' },
    { id: 'settings',  icon: <Settings size={16} />,      label: 'SETTINGS' },
  ];

  return (
    <aside style={{
      width: 240,
      minWidth: 240,
      background: C.surfaceLow,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      borderRight: `1px solid ${C.outlineV}`,
      zIndex: 10,
      flexShrink: 0,
      boxShadow: `10px 0 30px rgba(0,0,0,0.2)`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px', marginBottom: 40 }}>
        <div style={{
          width: 38, height: 38,
          background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`,
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 0 20px ${C.primary}66`,
        }}>
          <Cpu size={20} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 900, color: C.onSurface, fontFamily: font, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Neural Core
          </div>
          <div style={{ fontSize: 9, color: C.primary, fontWeight: 800, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>
            Node Access 01
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map(item => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 14px',
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              background: isActive ? `rgba(79,70,229,0.12)` : 'transparent',
              color: isActive ? C.primary : C.outline,
              boxShadow: isActive ? `inset 0 1px 1px rgba(255,255,255,0.05)` : 'none',
              fontSize: 10,
              fontWeight: 800,
              fontFamily: fontBody,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'left',
              width: '100%',
              textDecoration: 'none',
            })}
          >
            {item.icon}
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.label}
            </span>
            {item.id === 'dashboard' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.secondary }} />}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER: PRO-GRADE LOGOUT */}
      <div style={{ marginTop: 24, padding: '20px 0 0', borderTop: `1px solid ${C.outlineV}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px', marginBottom: 20 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', border: `1px solid ${C.outlineV}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.surfaceLow2 }}>
            <Activity size={14} color={C.secondary} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: C.onSurface, fontFamily: font, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name}</div>
            <div style={{ fontSize: 8, color: C.outline, fontWeight: 800, fontFamily: fontBody, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
              LINK ACTIVE
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            width: '100%', padding: '14px', borderRadius: 14,
            background: `rgba(239,68,68,0.08)`, border: `1px solid rgba(239,68,68,0.2)`,
            color: '#ef4444', fontSize: 10, fontWeight: 900, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontFamily: fontBody, letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
        >
          <LogOut size={14} /> SIGN OUT
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
