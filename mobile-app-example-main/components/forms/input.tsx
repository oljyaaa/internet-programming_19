import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export type FormInputProps = {
  placeholder?: string;
  backgroundColor?: string;
  secureTextEntry?: boolean;
  showPasswordIcon?: boolean;
  onChange(text: string): void;
}

const FormInput = ({
  placeholder,
  backgroundColor,
  secureTextEntry = false,
  showPasswordIcon = false,
  onChange
}: FormInputProps) => {
  const [text, onChangeText] = React.useState('');
  const [secureTextEntryState, setSecureTextEntryState] = React.useState(secureTextEntry);

  const handleChange = React.useCallback((value: string) => {
    onChangeText(value);
    onChange(value);
  }, [onChange]);

  const handleSecureTextEntryState = React.useCallback(() => {
    setSecureTextEntryState(!secureTextEntryState)
  }, [secureTextEntryState]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <div style={styles.container}>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: backgroundColor ? backgroundColor : styles.input.backgroundColor,
            }}
            onChangeText={handleChange}
            value={text}
            placeholder={placeholder ? placeholder : ''}
            secureTextEntry={secureTextEntryState}
          />
          {showPasswordIcon ? <div onClick={handleSecureTextEntryState}>
            <IconSymbol style={styles.icon} size={28} name="0.circle" color='#ff0000' />
          </div> : null}
        </div>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    height: 40,
    width: '95%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  icon: {
    marginLeft: 12,
  },
});

export default FormInput;