import React, { memo } from 'react';
import styles from './input.module.css';

type InputTypes =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'date'
    | 'time'
    | 'file'
    | 'search'
    | 'tel'
    | 'url';

interface BaseProps {
    label?: string;
    error?: string;
    required?: boolean;
    className?: string;
    containerClass?: string;
}

interface InputProps
    extends BaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {
    type?: InputTypes;
    as?: 'input';
}

interface TextareaProps
    extends BaseProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    as: 'textarea';
}

interface SelectProps
    extends BaseProps,
    React.SelectHTMLAttributes<HTMLSelectElement> {
    as: 'select';
    options: { label: string; value: string }[];
}

type Props = InputProps | TextareaProps | SelectProps;

const Input = (props: Props) => {
    const {
        label,
        error,
        required,
        className = '',
        containerClass = '',
    } = props;

    const renderField = () => {
        if (props.as === 'textarea') {
            return (
                <textarea
                    {...props}
                    className={`${styles.input} ${error ? styles.error : ''} ${className}`}
                />
            );
        }

        if (props.as === 'select') {
            return (
                <select
                    {...props}
                    className={`${styles.input} ${error ? styles.error : ''} ${className}`}
                >
                    {props.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                {...props}
                className={`${styles.input} ${error ? styles.error : ''} ${className}`}
            />
        );
    };

    return (
        <div className={`${styles.container} ${containerClass}`}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            {renderField()}

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default memo(Input);
