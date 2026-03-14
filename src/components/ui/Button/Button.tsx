import React, { memo } from 'react';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    children,
    disabled,
    ...rest
}: ButtonProps) => {
    return (
        <button
            className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${className}
      `}
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading ? <span className={styles.loader}></span> : children}
        </button>
    );
};

export default memo(Button);
