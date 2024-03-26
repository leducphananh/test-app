import classNames from 'classnames/bind';
import { PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

interface Props extends PropsWithChildren {
    error: FieldError | undefined;
}

const BaseField = ({ error, children }: Props) => {
    return (
        <>
            {children}
            {error && (
                <span className={cx('error-message')}>{error.message}</span>
            )}
        </>
    );
};

export default BaseField;
