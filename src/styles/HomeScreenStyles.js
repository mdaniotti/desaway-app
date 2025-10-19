import { StyleSheet } from 'react-native';
import { colors, typography, spacing, shadows, borders } from './index';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxxxxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
  },
  content: {
    width: '100%',
    maxWidth: spacing.width.maxContent,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: typography.fontWeight.bold,
    fontStyle: typography.fontStyle.bold,
    color: colors.primaryDark,
    marginBottom: spacing.xxxxl,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.large,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xxxxl,
  },
  formContainer: {
    backgroundColor: colors.backgroundLight,
    borderRadius: borders.radius.large,
    padding: spacing.padding.xxlarge,
    ...shadows.form,
  },
  inputGroup: {
    marginBottom: spacing.margin.large,
  },
  label: {
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
    fontStyle: typography.fontStyle.medium,
    fontFamily: typography.fontFamily.inter,
    color: colors.primaryDark,
    marginBottom: spacing.margin.small,
  },
  input: {
    borderRadius: borders.radius.small,
    padding: spacing.padding.small,
    fontSize: typography.fontSize.small,
    color: colors.primaryDark,
    backgroundColor: colors.white,
    height: spacing.height.input,
  },
  picker: {
    height: spacing.height.picker,
    color: colors.primaryDark,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borders.radius.medium,
    padding: spacing.padding.small,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
    fontStyle: typography.fontStyle.medium,
    fontFamily: typography.fontFamily.inter,
  },
});
