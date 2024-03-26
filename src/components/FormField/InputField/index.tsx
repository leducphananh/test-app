import { Form, Input, InputProps } from 'antd';
import {
    Controller,
    FieldPath,
    FieldValues,
    useFormContext,
} from 'react-hook-form';

interface Props extends InputProps {
    name: FieldPath<FieldValues>;
}

const InputField = ({ name, ...inputProps }: Props) => {
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
                    <Input {...inputProps} {...field} />
                </Form.Item>
            )}
        />
    );
};

export default InputField;
