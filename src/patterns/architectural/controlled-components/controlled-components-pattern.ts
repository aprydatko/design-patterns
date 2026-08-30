export type ControlledEmailInputProps = Readonly<{
  value: string;
  error: string | undefined;
  onChange: (value: string) => void;
  onSubmit: () => void;
}>;

export type ControlledEmailInputView = Readonly<{
  value: string;
  hasError: boolean;
  error: string | undefined;
  submit: () => void;
  change: (value: string) => void;
}>;

export type ControlledEmailInput = (props: ControlledEmailInputProps) => ControlledEmailInputView;

export type EmailFormController = Readonly<{
  render: () => ControlledEmailInputView;
  change: (value: string) => void;
  submit: () => void;
  getValue: () => string;
}>;

/**
 * A controlled component renders the value supplied by its parent and reports
 * user input through callbacks. It does not keep a competing internal value.
 */
export const renderControlledEmailInput = (
  props: ControlledEmailInputProps,
): ControlledEmailInputView => ({
  value: props.value,
  hasError: props.error !== undefined,
  error: props.error,
  submit: props.onSubmit,
  change: props.onChange,
});

/**
 * The controller owns the single source of truth and feeds the current value
 * back into the presentational input after every change.
 */
export const createEmailFormController = (
  input: ControlledEmailInput = renderControlledEmailInput,
  onSubmit: (email: string) => void = () => undefined,
): EmailFormController => {
  let value = '';
  let error: string | undefined;

  const submit = (): void => {
    const email = value.trim();

    if (email.length === 0) {
      error = 'Email is required';
      return;
    }

    error = undefined;
    onSubmit(email);
  };

  return {
    render: (): ControlledEmailInputView =>
      input({
        value,
        error,
        onChange: (nextValue) => {
          value = nextValue;
          error = undefined;
        },
        onSubmit: submit,
      }),
    change: (nextValue: string): void => {
      value = nextValue;
      error = undefined;
    },
    submit,
    getValue: (): string => value,
  };
};
