import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    color: colors.textPrimary,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: colors.textPrimary,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    color: colors.textPrimary,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: colors.textPrimary,
  },
  
  // Body text
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.textPrimary,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.textSecondary,
  },
  
  // Captions and labels
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: colors.textTertiary,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.textPrimary,
  },
  
  // Button text
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.white,
  },
  
  // Navigation text
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    color: colors.textPrimary,
  },
  navItem: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.textSecondary,
  },
};