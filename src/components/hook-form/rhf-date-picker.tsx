import { useFormContext, Controller } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  label: string;
};

export default function RHFDatePicker({ name, label, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isDateValid = field.value && !isNaN(Date.parse(field.value));
        return (
          <DatePicker
            className=""
            format="dd/MM/yyyy"
            label={label}
            value={isDateValid ? new Date(field.value) : null}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
                placeholder: 'DD/MM/AAAA',
              },
            }}
            {...other}
          />
        );
      }}
    />
  );
}
