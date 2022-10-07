import { useEffect } from "react";
import { FieldValues, useController, Path, SubmitHandler } from "react-hook-form";
import InputFieldBase, { ControlledInputFieldProps } from "../InputFieldBase/InputFieldBase";
import styles from './CheckBox.module.css';

type CheckBoxTypes = {
    value: string,
};
const CheckBox = <TFieldValues extends FieldValues = FieldValues>(
    {
        name,
        control,
        title,
        placeholder,
        type,
        defaultValue,
        rules,
        // value,
    }: ControlledInputFieldProps<TFieldValues> & CheckBoxTypes
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

    useEffect(()=>{
        console.log(value)
    })

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
                <h3>{title}</h3>
            </div>
        </InputFieldBase>
    );
};

export default CheckBox;