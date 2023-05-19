import { ReactNode } from 'react';
import styles from '~/components/HOC/layouy.module.scss';

interface LayoutProps {
    children : ReactNode;
}

const Layout = (props : LayoutProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.layout}>{props.children}</div>
        </div>
    )
}

export default Layout
