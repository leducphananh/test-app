import { Checkbox, Form } from 'antd';
import { CheckboxGroupProps, CheckboxProps } from 'antd/es/checkbox';
import {
    Controller,
    FieldPath,
    FieldValues,
    useFormContext,
} from 'react-hook-form';

interface CheckboxFieldProps extends CheckboxProps {
    name: FieldPath<FieldValues>;
}

const CheckboxField = ({ name, ...checkboxProps }: CheckboxFieldProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Form.Item
                    validateStatus={fieldState.error ? 'error' : ''}
                    help={fieldState.error?.message}
                >
                    <Checkbox {...checkboxProps} {...field} />
                </Form.Item>
            )}
        />
    );
};

interface CheckboxFieldGroupProps extends CheckboxGroupProps {
    name: FieldPath<FieldValues>;
}

const CheckboxFieldGroup = ({
    name,
    ...checkboxGroupProps
}: CheckboxFieldGroupProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Form.Item
                    validateStatus={fieldState.error ? 'error' : ''}
                    help={fieldState.error?.message}
                >
                    <Checkbox.Group {...checkboxGroupProps} {...field} />
                </Form.Item>
            )}
        />
    );
};

CheckboxField.Group = CheckboxFieldGroup;

export default CheckboxField;
