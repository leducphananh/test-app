import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CheckboxField, InputField, RadioField } from '~/components/FormField';

const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];

const TestForm = () => {
    const schema = z.object({
        email: z.string().email(),
        checked: z.boolean(),
        fruits_checkbox: z.array(z.string()).nonempty(),
        radio: z.boolean(),
        fruits_radio: z.string().optional(),
    });
    type FormValues = z.infer<typeof schema>;
    const form = useForm<FormValues>({
        mode: 'all',
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormValues) => {
        console.log('data', data);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <InputField name="email" placeholder="email" />

                {/* Checkbox */}
                <CheckboxField name="checked">Checked</CheckboxField>
                <CheckboxField.Group name="fruits_checkbox" options={options} />

                {/* Radio */}
                <RadioField name="radio">Radio</RadioField>
                <RadioField.Group name="fruits_radio" options={options} />

                <Button htmlType="submit">Submit</Button>
            </form>
        </FormProvider>
    );
};

export default TestForm;
