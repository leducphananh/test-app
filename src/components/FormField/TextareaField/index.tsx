import { Form, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import {
    Controller,
    FieldPath,
    FieldValues,
    useFormContext,
} from 'react-hook-form';

interface Props extends TextAreaProps {
    name: FieldPath<FieldValues>;
}

const TextAreaField = ({ name, ...textareaProps }: Props) => {
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
                    <Input.TextArea {...textareaProps} {...field} />
                </Form.Item>
            )}
        />
    );
};

export default TextAreaField;
