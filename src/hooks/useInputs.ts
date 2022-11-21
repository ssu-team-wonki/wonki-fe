import { FormElement } from '@nextui-org/react';
import { useState, useCallback, ChangeEvent } from 'react';

interface FormInstance {
  [key: string]: { value: string; error: boolean; validator?: (value: string) => boolean };
}

export const useInputs = (form: FormInstance) => {
  const [inputs, setInputs] = useState(form);

  const onChange = useCallback(
    (e: ChangeEvent<FormElement>) => {
      const { name, value } = e.target;
      setInputs(inputs => ({
        ...inputs,
        [name]: {
          ...inputs[name],
          value,
          error: !inputs[name].validator?.(value) || false,
        },
      }));
    },
    [setInputs],
  );

  const reset = useCallback(() => setInputs(form), [form]);

  return [inputs, onChange, reset] as const;
};
