import {
    useController,
    FieldValues,
    Path,
    PathValue
} from "react-hook-form";
import InputFieldBase, { type ControlledInputFieldProps } from "../InputFieldBase/InputFieldBase";

const SingleInputField = <TFieldValues extends FieldValues = FieldValues>(
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

    console.log(defaultValue);

    return (
        <InputFieldBase title={title} >
            <div>
                <input
                    name={name}
                    value={value}
                    type={type}
                    onBlur={onBlur}
                    ref={ref}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        </InputFieldBase>
    );
};

export default SingleInputField;