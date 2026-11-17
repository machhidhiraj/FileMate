import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Eye,
  EyeOff,
  FileCheck2,
  FileSpreadsheet,
  KeyRound,
  Lock,
  Mail,
  Receipt,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('priya.nair@brightpath.com');
  const [password, setPassword] = useState('Admin@321');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPriyaSelected = email.includes('priya.nair');
  const isRaviSelected = email.includes('ravi.menon');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(isRaviSelected ? '/finance/approvals' : '/assistant');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid email or password. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPriya = () => {
    setEmail('priya.nair@brightpath.com');
    setPassword('Admin@321');
  };

  const handleSelectRavi = () => {
    setEmail('ravi.menon@brightpath.com');
    setPassword('Admin@321');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bgcolor: '#080E1A', // Deep Obsidian Space
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(13, 148, 136, 0.18) 0%, transparent 45%),
          radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.14) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.8) 0%, transparent 100%)
        `,
        overflow: 'hidden',
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Decorative Background Grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `
            linear-gradient(#FFFFFF 1px, transparent 1px),
            linear-gradient(90deg, #FFFFFF 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* Main Glassmorphic Container */}
      <Card
        sx={{
          width: '100%',
          maxWidth: 960,
          borderRadius: 4,
          bgcolor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(13, 148, 136, 0.12)',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 1fr' },
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Left Side: Brand Narrative & Quick Personas */}
        <Box
          sx={{
            p: { xs: 3.5, sm: 4.5 },
            bgcolor: 'rgba(8, 14, 26, 0.65)',
            borderRight: { xs: 'none', md: '1px solid rgba(255, 255, 255, 0.08)' },
            borderBottom: { xs: '1px solid rgba(255, 255, 255, 0.08)', md: 'none' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Top Brand Block */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 6px 18px rgba(13, 148, 136, 0.4)',
                }}
              >
                <FileSpreadsheet size={24} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.025em',
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                  }}
                >
                  FileMate
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#2DD4BF',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontSize: '0.72rem',
                  }}
                >
                  Your Expense Assistant
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: '#94A3B8',
                mb: 3,
                lineHeight: 1.6,
                fontSize: '0.92rem',
              }}
            >
              Enterprise AI expense filing governed by deterministic policy guardrails and a cryptographic
              Human-in-the-Loop approval gate.
            </Typography>

            {/* Persona Quick Fill Cards */}
            <Typography
              variant="caption"
              sx={{
                color: '#64748B',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                mb: 1.5,
              }}
            >
              Select Evaluation Persona (1-Click Fill)
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {/* Priya Nair Card */}
              <Box
                onClick={handleSelectPriya}
                sx={{
                  p: 1.8,
                  borderRadius: 2.5,
                  cursor: 'pointer',
                  border: isPriyaSelected
                    ? '1.5px solid #0D9488'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  bgcolor: isPriyaSelected
                    ? 'rgba(13, 148, 136, 0.12)'
                    : 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.18s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:hover': {
                    bgcolor: 'rgba(13, 148, 136, 0.08)',
                    borderColor: '#0D9488',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#0D9488',
                      color: '#FFFFFF',
                      width: 38,
                      height: 38,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    PN
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                        Priya Nair
                      </Typography>
                      <Box
                        sx={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          bgcolor: 'rgba(13, 148, 136, 0.25)',
                          color: '#2DD4BF',
                          px: 0.8,
                          py: 0.2,
                          borderRadius: 1,
                        }}
                      >
                        E1042
                      </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                      Consultant • Files receipts, scans bills & reviews drafts
                    </Typography>
                  </Box>
                </Box>
                {isPriyaSelected && <CheckCircle2 size={18} color="#2DD4BF" />}
              </Box>

              {/* Ravi Menon Card */}
              <Box
                onClick={handleSelectRavi}
                sx={{
                  p: 1.8,
                  borderRadius: 2.5,
                  cursor: 'pointer',
                  border: isRaviSelected
                    ? '1.5px solid #0D9488'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  bgcolor: isRaviSelected
                    ? 'rgba(13, 148, 136, 0.12)'
                    : 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.18s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:hover': {
                    bgcolor: 'rgba(13, 148, 136, 0.08)',
                    borderColor: '#0D9488',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#0F766E',
                      color: '#FFFFFF',
                      width: 38,
                      height: 38,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    RM
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                        Ravi Menon
                      </Typography>
                      <Box
                        sx={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          bgcolor: 'rgba(15, 118, 110, 0.3)',
                          color: '#5EEAD4',
                          px: 0.8,
                          py: 0.2,
                          borderRadius: 1,
                        }}
                      >
                        E2087
                      </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                      Finance Controller • Approvals queue, audit logs & policies
                    </Typography>
                  </Box>
                </Box>
                {isRaviSelected && <CheckCircle2 size={18} color="#2DD4BF" />}
              </Box>
            </Box>
          </Box>

          {/* Bottom Security Assurance Banner */}
          <Box
            sx={{
              mt: 3,
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <ShieldCheck size={20} color="#14B8A6" />
            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.74rem' }}>
              <strong style={{ color: '#E2E8F0' }}>Ravi's Non-Negotiable:</strong> Receipt text is strictly data. Zero model writes without explicit human signature.
            </Typography>
          </Box>
        </Box>

        {/* Right Side: Clean Modern Sign-In Form */}
        <Box sx={{ p: { xs: 3.5, sm: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.015em' }}>
              Welcome back
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
              Sign in with your Brightpath credentials to continue.
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                bgcolor: 'rgba(225, 29, 72, 0.12)',
                color: '#FECDD3',
                border: '1px solid rgba(225, 29, 72, 0.3)',
                borderRadius: 2,
                fontSize: '0.85rem',
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
              {/* Email Input */}
              <Box>
                <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, display: 'block', mb: 0.8 }}>
                  Corporate Email
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@brightpath.com"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={17} color="#64748B" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(15, 23, 42, 0.6)',
                      color: '#FFFFFF',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      transition: 'border-color 0.15s ease',
                      '&:hover': {
                        border: '1px solid rgba(13, 148, 136, 0.5)',
                      },
                      '&.Mui-focused': {
                        border: '1.5px solid #0D9488',
                        boxShadow: '0 0 0 3px rgba(13, 148, 136, 0.2)',
                      },
                      '& fieldset': { border: 'none' },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#64748B',
                      opacity: 1,
                    },
                  }}
                />
              </Box>

              {/* Password Input */}
              <Box>
                <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, display: 'block', mb: 0.8 }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={17} color="#64748B" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          sx={{ color: '#94A3B8' }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(15, 23, 42, 0.6)',
                      color: '#FFFFFF',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      transition: 'border-color 0.15s ease',
                      '&:hover': {
                        border: '1px solid rgba(13, 148, 136, 0.5)',
                      },
                      '&.Mui-focused': {
                        border: '1.5px solid #0D9488',
                        boxShadow: '0 0 0 3px rgba(13, 148, 136, 0.2)',
                      },
                      '& fieldset': { border: 'none' },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#64748B',
                      opacity: 1,
                    },
                  }}
                />
              </Box>

              {/* Remember Me */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size="small"
                      sx={{
                        color: '#64748B',
                        '&.Mui-checked': { color: '#0D9488' },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.84rem' }}>
                      Keep me logged in
                    </Typography>
                  }
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#2DD4BF',
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  onClick={handleSelectPriya}
                >
                  Reset demo
                </Typography>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                endIcon={loading ? undefined : <ArrowRight size={17} />}
                sx={{
                  mt: 1,
                  py: 1.25,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  letterSpacing: '0.01em',
                  boxShadow: '0 4px 18px rgba(13, 148, 136, 0.4)',
                  transition: 'all 0.18s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
                    boxShadow: '0 6px 24px rgba(13, 148, 136, 0.55)',
                  },
                }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>
          </form>

          {/* Footer Security Badges */}
          <Box
            sx={{
              mt: 3.5,
              pt: 2.5,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#64748B',
              fontSize: '0.72rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Shield size={13} color="#0D9488" />
              <span>OWASP LLM 2025 Hardened</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <KeyRound size={13} color="#0D9488" />
              <span>SHA-256 Verified Gate</span>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
