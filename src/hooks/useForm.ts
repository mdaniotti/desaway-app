import { useState, useCallback } from 'react';
import { FormData, FormField } from '../types';

interface UseFormReturn {
  // State
  textField: string;
  numericField: string;
  selectedOption: string;
  // Generic setter
  setField: (field: FormField, value: string) => void;
  // Form data getter
  getFormData: () => FormData;
  // Validation
  isFormValid: () => boolean;
  // Form actions
  resetForm: () => void;
  setFormData: (data: FormData) => void;
}

const useForm = (initialData?: Partial<FormData>): UseFormReturn => {
  const [textField, setTextField] = useState<string>(initialData?.text || '');
  const [numericField, setNumericField] = useState<string>(
    initialData?.numeric || '',
  );
  const [selectedOption, setSelectedOption] = useState<string>(
    initialData?.option || '',
  );

  const getFormData = useCallback((): FormData => {
    return {
      text: textField,
      numeric: numericField,
      option: selectedOption,
    };
  }, [textField, numericField, selectedOption]);

  const isFormValid = useCallback((): boolean => {
    return (
      textField.trim() !== '' &&
      numericField.trim() !== '' &&
      selectedOption !== ''
    );
  }, [textField, numericField, selectedOption]);

  const resetForm = useCallback((): void => {
    setTextField('');
    setNumericField('');
    setSelectedOption('');
  }, []);

  const setFormData = useCallback((data: FormData): void => {
    setTextField(data.text || '');
    setNumericField(data.numeric || '');
    setSelectedOption(data.option || '');
  }, []);

  const setField = useCallback((field: FormField, value: string): void => {
    switch (field) {
      case 'text':
        setTextField(value);
        break;
      case 'numeric':
        const numericValue = value.replace(/[^0-9]/g, '');
        setNumericField(numericValue);
        break;
      case 'option':
        setSelectedOption(value);
        break;
      default:
        console.warn(`Unknown field: ${field}`);
    }
  }, []);

  return {
    textField,
    numericField,
    selectedOption,
    setField,
    getFormData,
    isFormValid,
    resetForm,
    setFormData,
  };
};

export default useForm;
