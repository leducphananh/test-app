import { Form, Radio, RadioGroupProps, RadioProps } from 'antd';
import {
    Controller,
    FieldPath,
    FieldValues,
    useFormContext,
} from 'react-hook-form';

interface RadioFieldProps extends RadioProps {
    name: FieldPath<FieldValues>;
}

const RadioField = ({ name, ...radioProps }: RadioFieldProps) => {
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
                    <Radio {...radioProps} {...field} />
                </Form.Item>
            )}
        />
    );
};

interface RadioGroupFieldProps extends RadioGroupProps {
    name: FieldPath<FieldValues>;
}

const RadioGroupField = ({
    name,
    ...radioGroupProps
}: RadioGroupFieldProps) => {
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
                    <Radio.Group {...radioGroupProps} {...field} />
                </Form.Item>
            )}
        />
    );
};

RadioField.Group = RadioGroupField;

export default RadioField;
