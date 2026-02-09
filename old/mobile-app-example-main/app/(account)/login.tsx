// import { Image } from 'expo-image';
// import { Button, StyleSheet } from 'react-native';

// import FormInput from '@/components/forms/input';
// import { HelloWave } from '@/components/hello-wave';
// import LoginForm from '@/components/login-form';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import React from 'react';

// const serverAction = async (login: string, password: string) => {
//   const response = await fetch('http://localhost:3000/api/users/login', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       login, password,
//     }),
//   });

//   const todos = await fetch('http://localhost:3000/api/todos', {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });

//   const oneTodo = await fetch('http://localhost:3000/api/todos/a646628c-4c08-42fb-9eed-53c62302a4cd', {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });

//   console.log('user', await response.json());

//   console.log('todos', await todos.json());

//   console.log('one todo', await oneTodo.json());
//   // return new Promise((resolve, reject) => {
//   //   setTimeout(() => {
//   //     alert(`Login: ${login} and Password: ${password}`);
//   //     resolve(null);
//   //   }, 1000)
//   // });
// }

// export default function LoginScreen() {
//   const [login, setLogin] = React.useState('Default login');
//   const [password, setPassword] = React.useState('Default password');
//   const [isSubmitting, setIsSubmitting] = React.useState(false);

//   const handleSubmit = React.useCallback(async () => {
//     setIsSubmitting(true);
//     await serverAction(login, password);
//     setIsSubmitting(false);
//   }, [login, password]);

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
//         <FormInput placeholder='password' secureTextEntry onChange={setPassword} />
//         <ThemedView style={styles.buttonContainer}>
//           <Button
//             title={isSubmitting ? `loading...` : 'Login'}
//             onPress={handleSubmit}
//             disabled={isSubmitting}
//           />
//         </ThemedView>
//       </ThemedView>
//       <ThemedView>
//         <LoginForm />
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
//     margin: 12,
//   }
// });
import { Image } from 'expo-image';
import { Button, StyleSheet } from 'react-native';

import FormInput from '@/components/forms/input';
import { HelloWave } from '@/components/hello-wave';
import LoginForm from '@/components/login-form';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';

const serverAction = async (login: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login, password,
      }),
    });

    const userData = await response.json();

    if (!response.ok) {
      alert(`Помилка входу: ${userData.error}`);
      return; 
    }

    console.log('User logged in:', userData);
    alert(`Вітаємо, ${userData.login}! Ваша роль: ${userData.role}`);

    const todosResponse = await fetch('http://localhost:3000/api/todos', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    
    const todos = await todosResponse.json();
    console.log('Todos list:', todos);

  } catch (error) {
    console.error(error);
    alert('Сервер не відповідає. Перевір, чи запущено node server.js');
  }
}

export default function LoginScreen() {
  const [login, setLogin] = React.useState('Default login');
  const [password, setPassword] = React.useState('Default password');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(async () => {
    setIsSubmitting(true);
    await serverAction(login, password);
    setIsSubmitting(false);
  }, [login, password]);

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
        <ThemedText type="title">Login!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <FormInput placeholder='login' onChange={setLogin} />
        <FormInput placeholder='password' secureTextEntry onChange={setPassword} />
        <ThemedView style={styles.buttonContainer}>
          <Button
            title={isSubmitting ? `loading...` : 'Login'}
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <LoginForm />
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
    margin: 12,
  }
});