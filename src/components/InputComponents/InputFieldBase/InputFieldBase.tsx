import { HTMLInputTypeAttribute } from 'react';
import {FieldValues, UseControllerProps} from 'react-hook-form';

export type ControlledInputFieldProps<TFieldValues extends FieldValues = FieldValues> = {
    title?: string,
    placeholder?: string,
    name: string,
    type?: HTMLInputTypeAttribute, 
} & UseControllerProps<TFieldValues>;

type InputFieldProps = {
    title?: string,
    children: JSX.Element | JSX.Element[]
};

const InputFieldBase = ({...props}:InputFieldProps) => {
    const {title, children} = props;

    return(
        <div>
            {title ? <h3>{title}</h3> : null}
            {children}
        </div>
    );
};

export default InputFieldBase;