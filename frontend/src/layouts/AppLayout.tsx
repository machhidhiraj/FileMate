import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Bot,
  ChevronDown,
  Clock,
  FileCheck,
  FileSpreadsheet,
  Layers,
  LogOut,
  Presentation,
  Receipt,
  Settings,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, logout } = useAuth();
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  const isFinance = user?.role === 'Finance Controller';

  // Horizontal Navigation items matching Capstone Requirements
  const navItems: NavItem[] = isFinance
    ? [
        { label: 'Expense Assistant', path: '/assistant', icon: <Bot size={16} /> },
        { label: 'Finance Approvals', path: '/finance/approvals', icon: <FileCheck size={16} /> },
        { label: 'Submitted Reports', path: '/expenses', icon: <Receipt size={16} /> },
        { label: 'Recent Runs', path: '/runs', icon: <Clock size={16} /> },
        { label: 'Run Logs (D4)', path: '/logs', icon: <Layers size={16} /> },
        { label: 'Expense Policy', path: '/policy', icon: <ShieldCheck size={16} /> },
        { label: 'Settings', path: '/settings', icon: <Settings size={16} /> },
      ]
    : [
        { label: 'Expense Assistant', path: '/assistant', icon: <Bot size={16} /> },
        { label: 'My Expense Reports', path: '/expenses', icon: <Receipt size={16} /> },
        { label: 'Recent Runs', path: '/runs', icon: <Clock size={16} /> },
        { label: 'Run Logs (D4)', path: '/logs', icon: <Layers size={16} /> },
        { label: 'Expense Policy', path: '/policy', icon: <ShieldCheck size={16} /> },
        { label: 'Settings', path: '/settings', icon: <Settings size={16} /> },
      ];

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null);
  };

  const handleSwitchPersona = async () => {
    handleCloseProfileMenu();
    const isPriya = user?.employee_id === 'E1042';
    const targetEmail = isPriya ? 'ravi.menon@brightpath.com' : 'priya.nair@brightpath.com';
    await login(targetEmail, 'Admin@321');
    navigate(isPriya ? '/finance/approvals' : '/assistant');
  };

  const handleLogout = async () => {
    handleCloseProfileMenu();
    await logout();
    navigate('/login');
  };

  const initials = user?.full_name
    ? user.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'PN';

  const isItemActive = (path: string) => {
    if (path === '/runs') {
      return location.pathname === '/runs' || location.pathname.startsWith('/runs/');
    }
    if (path === '/expenses') {
      return location.pathname === '/expenses' || location.pathname.startsWith('/expenses/');
    }
    if (path === '/finance/approvals') {
      return location.pathname === '/finance/approvals';
    }
    return location.pathname === path;
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC' }}>
      {/* ============================================================== */}
      {/* 2-TIER ENTERPRISE TOP NAVBAR */}
      {/* ============================================================== */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          bgcolor: '#0B132B', // Deep Obsidian
          color: '#FFFFFF',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Tier 1: Identity & User Controls Bar */}
        <Box
          sx={{
            height: 54,
            px: { xs: 2, sm: 3, md: 4 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
            maxWidth: 1720,
            mx: 'auto',
            width: '100%',
          }}
        >
          {/* Brand Identity */}
          <Box
            onClick={() => navigate('/assistant')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 2px 10px rgba(13, 148, 136, 0.4)',
              }}
            >
              <FileSpreadsheet size={18} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.025em',
                  fontSize: '1.02rem',
                  lineHeight: 1,
                }}
              >
                FileMate
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#2DD4BF',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Brightpath Vault
              </Typography>
            </Box>
          </Box>

          {/* Right Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
            {/* Security Badge */}
            <Tooltip title="Ravi Menon's Non-Negotiable: Zero writes without explicit human approval, enforced in code." arrow>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 0.8,
                  px: 1.2,
                  py: 0.4,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(13, 148, 136, 0.15)',
                  border: '1px solid rgba(13, 148, 136, 0.3)',
                }}
              >
                <ShieldCheck size={14} color="#2DD4BF" />
                <Typography variant="caption" sx={{ color: '#5EEAD4', fontSize: '0.72rem', fontWeight: 700 }}>
                  HITL Gate Active • Zero Model Writes
                </Typography>
              </Box>
            </Tooltip>

            {/* Executive Deck Button */}
            <Button
              size="small"
              onClick={() => window.open('http://localhost:8001/presentations/filemate_executive_presentation.html', '_blank')}
              startIcon={<Presentation size={14} color="#2DD4BF" />}
              sx={{
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.78rem',
                bgcolor: 'rgba(13, 148, 136, 0.15)',
                border: '1px solid rgba(13, 148, 136, 0.3)',
                color: '#2DD4BF',
                px: 1.2,
                py: 0.4,
                display: { xs: 'none', md: 'flex' },
                '&:hover': {
                  bgcolor: 'rgba(13, 148, 136, 0.3)',
                  borderColor: '#0D9488',
                  color: '#FFFFFF',
                },
              }}
            >
              Executive Deck
            </Button>

            {/* Quick Switch Persona Pill Button */}
            <Button
              size="small"
              onClick={handleSwitchPersona}
              startIcon={<UserCheck size={14} color="#2DD4BF" />}
              sx={{
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.78rem',
                bgcolor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#F1F5F9',
                px: 1.2,
                py: 0.4,
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  bgcolor: 'rgba(13, 148, 136, 0.2)',
                  borderColor: '#0D9488',
                  color: '#FFFFFF',
                },
              }}
            >
              Switch to {user?.employee_id === 'E1042' ? 'Ravi (Finance)' : 'Priya (Consultant)'}
            </Button>

            {/* User Profile Avatar & Menu */}
            <Box
              onClick={handleOpenProfileMenu}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                p: 0.4,
                pl: 0.8,
                borderRadius: 2,
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.18)',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: isFinance ? '#0F766E' : '#0D9488',
                  color: '#FFFFFF',
                  width: 28,
                  height: 28,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                }}
              >
                {initials}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left', lineHeight: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.8rem' }}>
                  {user?.full_name || 'Priya Nair'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.65rem' }}>
                  {user?.employee_id || 'E1042'} • {isFinance ? 'Finance' : 'Consultant'}
                </Typography>
              </Box>
              <ChevronDown size={13} color="#94A3B8" />
            </Box>

            {/* Profile Dropdown Menu */}
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleCloseProfileMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2.5,
                  minWidth: 230,
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
                  border: '1px solid #E2E8F0',
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                  {user?.full_name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                  {user?.email}
                </Typography>
                <Box sx={{ mt: 0.8, display: 'flex', gap: 0.8 }}>
                  <Chip
                    label={user?.role}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      bgcolor: '#F0FDFA',
                      color: '#0F766E',
                    }}
                  />
                  <Chip
                    label={user?.employee_id}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      bgcolor: '#F1F5F9',
                      color: '#475569',
                    }}
                  />
                </Box>
              </Box>
              <Divider />
              <MenuItem onClick={handleSwitchPersona} sx={{ color: '#0D9488', fontWeight: 600, gap: 1, py: 1.2 }}>
                <UserCheck size={16} />
                {user?.employee_id === 'E1042'
                  ? 'Switch to Ravi Menon (Finance)'
                  : 'Switch to Priya Nair (Consultant)'}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: '#E11D48', gap: 1, py: 1.2 }}>
                <LogOut size={16} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Tier 2: Dedicated Horizontal Navigation Bar */}
        <Box
          sx={{
            height: 46,
            px: { xs: 2, sm: 3, md: 4 },
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#070E1E', // Darker navy bar for navigation
            maxWidth: 1720,
            mx: 'auto',
            width: '100%',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <Box
            component="nav"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minWidth: 'max-content',
            }}
          >
            {navItems.map((item) => {
              const active = isItemActive(item.path);
              return (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    px: 1.8,
                    py: 0.6,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.84rem',
                    color: active ? '#FFFFFF' : '#94A3B8',
                    bgcolor: active ? '#0D9488' : 'transparent',
                    boxShadow: active ? '0 2px 8px rgba(13, 148, 136, 0.4)' : 'none',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      bgcolor: active ? '#0F766E' : 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                    },
                    '& .MuiButton-startIcon': {
                      color: active ? '#FFFFFF' : '#2DD4BF',
                      mr: 0.8,
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* ============================================================== */}
      {/* MAIN VIEWPORT CONTENT */}
      {/* ============================================================== */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          overflowY: 'auto',
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 1680, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
