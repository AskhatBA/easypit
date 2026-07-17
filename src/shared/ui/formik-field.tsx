import { useField } from 'formik';

import { TextField, type TextFieldProps } from './text-field';

type FormikFieldProps = Omit<TextFieldProps, 'value' | 'onChangeText'> & {
  name: string;
};

/** Мост formik → TextField: ошибку показываем только после blur. */
export const FormikField = ({ name, ...fieldProps }: FormikFieldProps) => {
  const [field, meta, helpers] = useField<string>(name);

  return (
    <TextField
      value={field.value}
      onChangeText={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      error={meta.touched ? meta.error : undefined}
      {...fieldProps}
    />
  );
};
