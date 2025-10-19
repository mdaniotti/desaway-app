import { StyleSheet } from 'react-native';
import { colors, typography, spacing, shadows, borders } from './index';

export const customPickerStyles = StyleSheet.create({
  container: {
    height: spacing.height.input,
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderRadius: borders.radius.small,
    paddingHorizontal: spacing.padding.small,
  },
  pickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
    fontSize: typography.fontSize.small,
    color: colors.primaryDark,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borders.radius.medium,
    width: '100%',
    maxWidth: spacing.width.maxModal,
    maxHeight: '70%',
    ...shadows.modal,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold,
    fontStyle: typography.fontStyle.bold,
    fontFamily: typography.fontFamily.inter,
    color: colors.primaryDark,
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeButtonText: {
    fontSize: typography.fontSize.medium,
    color: colors.primaryDark,
    fontWeight: typography.fontWeight.bold,
  },
  optionsList: {
    maxHeight: 200,
  },
  optionItem: {
    padding: spacing.xl,
    borderRadius: borders.radius.small,
  },
  selectedOption: {
    backgroundColor: colors.selected,
  },
  optionText: {
    fontSize: typography.fontSize.small,
    color: colors.primaryDark,
  },
  selectedOptionText: {
    color: colors.primaryLight,
    fontWeight: typography.fontWeight.medium,
    fontStyle: typography.fontStyle.bold,
    fontFamily: typography.fontFamily.inter,
  },
});
