import { FieldValues, useController, Path } from 'react-hook-form';
import InputFieldBase, { ControlledInputFieldProps } from '../InputFieldBase/InputFieldBase';
import styles from './TimeInputField.module.css';

const TimeInputField = <TFieldValues extends FieldValues = FieldValues>(
    {
        name,
        control,
        title,
        placeholder,
        type,
        defaultValue,
        rules,
    }: ControlledInputFieldProps<TFieldValues>
) => {
    const {
        field: {
            onChange,
            ref,
            value,
            onBlur
        },
    } = useController<TFieldValues, Path<TFieldValues>>({
        name,
        control,
        defaultValue: defaultValue,
        rules,
    });
    return (
        <InputFieldBase>
            <div className={styles.container}>
                <input
                    name={name}
                    value={value}
                    type={type}
                    onBlur={onBlur}
                    ref={ref}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={styles.input}
                />
            </div>
        </InputFieldBase>
    );
};

export default TimeInputField;
