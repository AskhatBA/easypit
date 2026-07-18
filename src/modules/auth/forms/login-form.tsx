import { Formik } from 'formik';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

import { colors, fonts, spacing } from '@/shared/config';
import { Button, FormikField } from '@/shared/ui';

import { useLogin, useLoginError } from '../hooks';

type LoginFormValues = {
  identifier: string;
  password: string;
};

const initialValues: LoginFormValues = {
  identifier: '',
  password: '',
};

const validationSchema = Yup.object({
  identifier: Yup.string()
    .trim()
    .required('Введите email или телефон'),
  password: Yup.string().required('Введите пароль'),
});

export const LoginForm = () => {
  const loginMutation = useLogin();
  const errorMessage = useLoginError(loginMutation.error);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => loginMutation.mutate(values)}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikField
            name="identifier"
            label="Email или телефон"
            placeholder="your@email.com или +7 700 000 00 00"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="username"
          />

          <View>
            <FormikField
              name="password"
              label="Пароль"
              placeholder="Введите пароль"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
            />
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => setShowPassword(current => !current)}
              style={styles.toggle}
            >
              <Text style={styles.toggleText}>
                {showPassword ? 'Скрыть' : 'Показать'}
              </Text>
            </Pressable>
          </View>

          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}

          <Button
            title="Войти"
            loading={loginMutation.isPending}
            onPress={() => handleSubmit()}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: spacing.lg,
  },
  toggle: {
    position: 'absolute',
    right: spacing.lg,
    top: 34,
    height: 24,
    justifyContent: 'center',
  },
  toggleText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textMuted,
  },
  error: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.danger,
  },
});
