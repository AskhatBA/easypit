import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

import { toApiError } from '@/api';
import { useAuthStore } from '@/modules/auth';
import { colors, fonts, spacing } from '@/shared/config';
import { formatPrice } from '@/shared/lib';
import { Button, FormikField } from '@/shared/ui';

import { useBookingDraft } from '../context';
import { useCreateBooking } from '../hooks';

type BookingFormValues = {
  carNumber: string;
  comment: string;
};

const validationSchema = Yup.object({
  carNumber: Yup.string()
    .required('Укажите госномер')
    .min(4, 'Слишком короткий номер'),
  comment: Yup.string().max(200, 'Не больше 200 символов'),
});

type BookingFormProps = {
  totalPrice: number;
  onSuccess: () => void;
};

export const BookingForm = ({ totalPrice, onSuccess }: BookingFormProps) => {
  const { draft, isReady } = useBookingDraft();
  const carNumber = useAuthStore(state => state.user?.carNumber);
  const createBookingMutation = useCreateBooking();
  const errorMessage = createBookingMutation.error
    ? toApiError(createBookingMutation.error).message
    : null;

  const initialValues: BookingFormValues = {
    carNumber: carNumber ?? '',
    comment: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        if (!draft.washId || !draft.slotId) {
          return;
        }

        createBookingMutation.mutate(
          {
            washId: draft.washId,
            slotId: draft.slotId,
            serviceIds: draft.serviceIds,
            carNumber: values.carNumber,
            comment: values.comment || undefined,
          },
          { onSuccess },
        );
      }}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikField
            name="carNumber"
            label="Госномер"
            placeholder="777 ABC 02"
            autoCapitalize="characters"
          />

          <FormikField
            name="comment"
            label="Комментарий"
            placeholder="Например: сильно грязные диски"
            multiline
            style={styles.comment}
          />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Итого</Text>
            <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
          </View>

          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}

          <Button
            title="Записаться"
            variant="accent"
            disabled={!isReady}
            loading={createBookingMutation.isPending}
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
  comment: {
    height: 88,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textMuted,
  },
  totalValue: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    color: colors.text,
  },
  error: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.danger,
  },
});
