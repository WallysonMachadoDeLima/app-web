import { useFormContext, Controller } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';
// utils
import * as Mask from 'src/utils/mask';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  mask?: string;
};

interface MaskObject {
  [key: string]: ((value: string) => string) | undefined;
}

export default function RHFTextField({ name, helperText, mask, type, ...other }: Props) {
  const { control } = useFormContext();
  const maskObject: MaskObject = Mask;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={
            type === 'number' && field.value === 0
              ? ''
              : mask
              ? maskObject?.[mask]?.(field.value)
              : field.value
          }
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(mask ? maskObject?.[mask]?.(event.target.value) : event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
