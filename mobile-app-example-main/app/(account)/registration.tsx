// import { Image } from 'expo-image';
// import { Button, StyleSheet } from 'react-native';

// import FormInput from '@/components/forms/input';
// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import React from 'react';

// const serverAction = (
//   login: string,
//   name: string,
//   surname: string,
//   password: string,
//   confirmPassword: string,
// ) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       alert(`
//         Login: ${login}
//         Name: ${name}
//         Surname: ${surname}
//         Password: ${password}
//         ConfirmPassword: ${confirmPassword}`);
//       resolve(null);
//     }, 1000)
//   });
// }

// const validatePasswordConfirmation = (password: string, confirmPassword: string) => {
//   return password === confirmPassword;
// };

// export default function LoginScreen() {
//   const [login, setLogin] = React.useState('monterio');
//   const [name, setName] = React.useState('Leonid');
//   const [surname, setSurname] = React.useState('Pelykhivskyi');
//   const [password, setPassword] = React.useState('');
//   const [confirmPassword, setConfirmPassword] = React.useState('');
//   const [isSubmitting, setIsSubmitting] = React.useState(false);

//   const handleSubmit = React.useCallback(async () => {
//     setIsSubmitting(true);
//     const isConfirmPasswordValid = validatePasswordConfirmation(password, confirmPassword);
//     if (isConfirmPasswordValid) {
//       await serverAction(login, name, surname, password, confirmPassword);
//     } else {
//       alert('Password doesn\'t match confirm password');
//     }

//     setIsSubmitting(false);
//   }, [confirmPassword, login, name, password, surname]);

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Login!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView>
//         <FormInput placeholder='login' onChange={setLogin} />
//         <FormInput placeholder='name' onChange={setName} />
//         <FormInput placeholder='surname' onChange={setSurname} />
//         <FormInput placeholder='password' secureTextEntry showPasswordIcon onChange={setPassword} />
//         <FormInput placeholder='confirm password' secureTextEntry showPasswordIcon onChange={setConfirmPassword} />
//         <ThemedView style={styles.buttonContainer}>
//           <Button
//             title={isSubmitting ? `loading...` : 'Registration'}
//             onPress={handleSubmit}
//             disabled={isSubmitting}
//           />
//         </ThemedView>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
//   buttonContainer: {
//     margin: 12
//   },
// });

import { Image } from 'expo-image';
import { Button, StyleSheet } from 'react-native';

import FormInput from '@/components/forms/input';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';

const serverAction = async (
  login: string,
  name: string,
  surname: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // Відправляємо тільки login та password
      body: JSON.stringify({
        login,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Успішна реєстрація! Користувач: ${data.user.login}`);
    } else {
      alert(`Помилка: ${data.error}`);
    }
  } catch (error) {
    console.error(error);
    alert('Не вдалося з\'єднатися з сервером');
  }
}

const validatePasswordConfirmation = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

export default function RegistrationScreen() {
  const [login, setLogin] = React.useState('monterio');
  const [name, setName] = React.useState('Leonid');
  const [surname, setSurname] = React.useState('Pelykhivskyi');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(async () => {
    setIsSubmitting(true);
    const isConfirmPasswordValid = validatePasswordConfirmation(password, confirmPassword);
    if (isConfirmPasswordValid) {
      await serverAction(login, name, surname, password, confirmPassword);
    } else {
      alert('Password doesn\'t match confirm password');
    }

    setIsSubmitting(false);
  }, [confirmPassword, login, name, password, surname]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Registration!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <FormInput placeholder='login' onChange={setLogin} />
        <FormInput placeholder='name' onChange={setName} />
        <FormInput placeholder='surname' onChange={setSurname} />
        <FormInput placeholder='password' secureTextEntry showPasswordIcon onChange={setPassword} />
        <FormInput placeholder='confirm password' secureTextEntry showPasswordIcon onChange={setConfirmPassword} />
        <ThemedView style={styles.buttonContainer}>
          <Button
            title={isSubmitting ? `loading...` : 'Registration'}
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    margin: 12
  },
});