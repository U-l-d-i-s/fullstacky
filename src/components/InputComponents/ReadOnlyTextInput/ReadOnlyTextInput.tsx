import InputFieldBase from '../InputFieldBase/InputFieldBase';
import styles from './ReadOnlyTextInput.module.css';

type ReadOnlyTextInputProps = {
    defaultValue?: string,
    title?: string,
    placeholder?: string,
};

const ReadOnlyTextInput = ({
    defaultValue,
    title,
    placeholder,
}: ReadOnlyTextInputProps) => {

    return (
        <InputFieldBase title={title} >
            <input
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={styles.input}
            />
        </InputFieldBase>
    );
}

export default ReadOnlyTextInput;