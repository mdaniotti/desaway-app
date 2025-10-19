import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';

import { CustomPickerProps, PickerOption } from '../types';
import { customPickerStyles } from '../styles/CustomPickerStyles';

const CustomPicker: React.FC<CustomPickerProps> = ({
  selectedValue,
  onValueChange,
  options = [],
  style,
  itemStyle,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<PickerOption | null>(null);

  useEffect(() => {
    const found =
      options.find(option => option.value === selectedValue) || null;
    setSelectedItem(found);
  }, [selectedValue, options]);

  const handleSelect = (item: PickerOption): void => {
    setSelectedItem(item);
    onValueChange(item.value);
    setIsVisible(false);
  };

  const getDisplayText = (): string => {
    if (selectedItem) return selectedItem.label;

    const found = options.find(option => option.value === selectedValue);
    if (found) return found.label;

    return '';
  };

  const renderItem = ({ item }: { item: PickerOption }) => (
    <TouchableOpacity
      style={[
        customPickerStyles.optionItem,
        selectedValue === item.value && customPickerStyles.selectedOption,
        itemStyle,
      ]}
      onPress={() => handleSelect(item)}
    >
      <Text
        style={[
          customPickerStyles.optionText,
          selectedValue === item.value && customPickerStyles.selectedOptionText,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[customPickerStyles.container, style]}>
      <TouchableOpacity
        style={customPickerStyles.pickerButton}
        onPress={() => setIsVisible(true)}
      >
        <Text style={customPickerStyles.pickerText}>{getDisplayText()}</Text>
        <Image
          source={require('../assets/arrow_down.png')}
          style={{ width: 10, height: 6 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={customPickerStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={customPickerStyles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={renderItem}
              style={customPickerStyles.optionsList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomPicker;
