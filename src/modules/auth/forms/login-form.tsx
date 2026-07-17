import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

import { colors, fonts, spacing } from '@/shared/config';
import { Button, FormikField } from '@/shared/ui';

import { useLogin, useLoginError, useRequestCode } from '../hooks';
import { MOCK_LOGIN_CODE } from '../mocks';

type LoginFormValues = {
  phone: string;
  code: string;
};

const initialValues: LoginFormValues = {
  phone: '',
  code: '',
};

const validationSchema = Yup.object({
  phone: Yup.string()
    .required('Введите номер телефона')
    .matches(/^\+?[0-9\s()-]{10,18}$/, 'Проверьте номер телефона'),
  code: Yup.string()
    .required('Введите код из SMS')
    .length(4, 'Код состоит из 4 цифр'),
});

export const LoginForm = () => {
  const requestCodeMutation = useRequestCode();
  const loginMutation = useLogin();
  const errorMessage = useLoginError(loginMutation.error);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => loginMutation.mutate(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.form}>
          <FormikField
            name="phone"
            label="Телефон"
            placeholder="+7 707 123 45 67"
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
          />

          <FormikField
            name="code"
            label="Код из SMS"
            placeholder="0000"
            keyboardType="number-pad"
            maxLength={4}
            textContentType="oneTimeCode"
          />

          <Button
            title="Отправить код"
            variant="ghost"
            loading={requestCodeMutation.isPending}
            disabled={!values.phone}
            onPress={() => requestCodeMutation.mutate(values.phone)}
          />

          {requestCodeMutation.isSuccess ? (
            <Text style={styles.hint}>
              Код отправлен. Тестовый код — {MOCK_LOGIN_CODE}.
            </Text>
          ) : null}

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
  hint: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  error: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.danger,
  },
});
