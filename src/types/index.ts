export interface PickerOption {
  label: string;
  value: string;
}

export interface FormData {
  text: string;
  numeric: string;
  option: string;
}

export type FormField = keyof FormData;

export interface CustomPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  options?: PickerOption[];
  style?: any;
  itemStyle?: any;
}

export interface PDFService {
  generatePDF: (
    formData: FormData,
    pickerOptions: PickerOption[],
  ) => Promise<{ success: boolean }>;
}

export interface PDFGenerationResult {
  success: boolean;
  error?: string;
}

export interface UsePersistenceReturn {
  loadingData: boolean;
  saveData: (data: FormData) => Promise<void>;
  loadData: () => Promise<FormData | null>;
  clearData: () => Promise<void>;
}

export interface UseFormReturn {
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
