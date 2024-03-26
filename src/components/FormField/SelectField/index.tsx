import { Form, Select, SelectProps } from 'antd';
import {
    Controller,
    FieldPath,
    FieldValues,
    useFormContext,
} from 'react-hook-form';

interface Props extends SelectProps {
    name: FieldPath<FieldValues>;
}

const SelectField = ({ name, ...selectProps }: Props) => {
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
                    <Select {...selectProps} {...field} />
                </Form.Item>
            )}
        />
    );
};

export default SelectField;
