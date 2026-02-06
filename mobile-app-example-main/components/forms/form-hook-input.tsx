import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export type FormHookInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>
  placeholder?: string;
  backgroundColor?: string;
  secureTextEntry?: boolean;
  showPasswordIcon?: boolean;
}

function FormHookInput<T extends FieldValues>({
  control,
  placeholder,
  name,
  backgroundColor,
  secureTextEntry,
  showPasswordIcon
}: FormHookInputProps<T>) {
  const [secureTextEntryState, setSecureTextEntryState] = React.useState(secureTextEntry);

  const handleSecureTextEntryState = React.useCallback(() => {
    setSecureTextEntryState(!secureTextEntryState)
  }, [secureTextEntryState]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <div style={styles.container}>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: backgroundColor ? backgroundColor : styles.input.backgroundColor,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={placeholder ? placeholder : ''}
                  secureTextEntry={secureTextEntryState}
                />
                {showPasswordIcon ? <div onClick={handleSecureTextEntryState}>
                  <IconSymbol style={styles.icon} size={28} name="0.circle" color='#ff0000' />
                </div> : null}
              </>
            )}
          />
        </div>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

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

export default FormHookInput;
