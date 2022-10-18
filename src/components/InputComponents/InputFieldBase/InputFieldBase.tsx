import { HTMLInputTypeAttribute } from 'react';
import {FieldValues, UseControllerProps} from 'react-hook-form';
import styles from './InputFieldBase.module.css';

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
        <div className={styles.container}>
            {title ? <h3>{title}</h3> : null}
            {children}
        </div>
    );
};

export default InputFieldBase;