import { ReactNode } from 'react';
import styles from '~/components/HOC/layouy.module.scss';
import { AppHeader } from '~/components/floating/appHeader';

interface LayoutProps {
    children : ReactNode;
    hasAppHeader : boolean;
}

const Layout = ({children, hasAppHeader} : LayoutProps) => {
    return (
        <>
        {hasAppHeader && <AppHeader/>}
        <div className={styles.wrapper}>
            <div className={styles.layout}>{children}</div>
        </div>
        </>
    )
}

export default Layout
