import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import CustomPicker from '../components/CustomPicker';
import useForm from '../hooks/useForm';
import usePersistence from '../hooks/usePersistence';
import pdfService from '../services/pdfService';
import { PICKER_OPTIONS } from '../constants';
import { sleep, debounce } from '../utils';
import { homeScreenStyles } from '../styles/HomeScreenStyles';
import { colors } from '../styles/colors';

const HomeScreen: React.FC = () => {
  const debounceRef = useRef<number | null>(null);
  const persistence = usePersistence();
  const form = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const savedData = await persistence.loadData();
      if (savedData) form.setFormData(savedData);
    };

    loadData();
  }, []);

  // Save data debounced to avoid multiple saves
  useEffect(() => {
    debounce(
      () => {
        persistence.saveData(form.getFormData());
      },
      2000,
      debounceRef,
    );
  }, [form.textField, form.numericField, form.selectedOption]);

  const handleGeneratePDF = async (): Promise<void> => {
    if (!form.isFormValid()) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    setLoading(true);
    await sleep(500); // Force rendering the loading state

    try {
      // Generate PDF
      const formData = form.getFormData();

      await pdfService.generatePDF(formData, PICKER_OPTIONS);

      Alert.alert('Success!', 'PDF generated successfully', [{ text: 'OK' }]);

      // Clear data after successful generation
      await persistence.clearData();
      form.resetForm();
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert(
        'Error',
        'Failed to generate PDF: ' + (error as Error).message,
      );
    } finally {
      setLoading(false);
    }
  };

  if (persistence.loadingData) {
    return (
      <View style={homeScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={homeScreenStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 10}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={homeScreenStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={homeScreenStyles.content}>
            <View style={homeScreenStyles.formContainer}>
              <Text style={homeScreenStyles.title}>Generate PDF</Text>

              <View style={homeScreenStyles.inputGroup}>
                <Text style={homeScreenStyles.label}>Dato 1</Text>
                <TextInput
                  style={homeScreenStyles.input}
                  value={form.textField}
                  onChangeText={value => form.setField('text', value)}
                  placeholder=""
                />
              </View>

              <View style={homeScreenStyles.inputGroup}>
                <Text style={homeScreenStyles.label}>Dato 2</Text>
                <CustomPicker
                  selectedValue={form.selectedOption}
                  onValueChange={value => form.setField('option', value)}
                  options={PICKER_OPTIONS}
                />
              </View>

              <View style={homeScreenStyles.inputGroup}>
                <Text style={homeScreenStyles.label}>Dato 3</Text>
                <TextInput
                  style={homeScreenStyles.input}
                  value={form.numericField}
                  onChangeText={value => form.setField('numeric', value)}
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity
                style={[
                  homeScreenStyles.button,
                  loading && homeScreenStyles.buttonDisabled,
                ]}
                onPress={handleGeneratePDF}
                disabled={loading}
              >
                <Text style={homeScreenStyles.buttonText}>
                  {loading ? 'Generating PDF...' : 'Generate PDF'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
