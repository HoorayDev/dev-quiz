import { ReactNode } from 'react';
import styles from '~/components/HOC/layout.module.scss';
import { AppHeader } from '~/components/floating/appHeader';
import { DQFooter } from '~/components/reusable/DQFooter'
import cn from "clsx";

interface LayoutProps {
    children : ReactNode;
    hasAppHeader : boolean;
    hasAppFooter : boolean;
}

const Layout = ({children, hasAppHeader, hasAppFooter} : LayoutProps) => {
    return (
        <>
        {hasAppHeader && <AppHeader/>}
        <div className={cn(styles.wrapper, { [styles.hasAppHeaderWrapper]: hasAppHeader }, { [styles.hasAppFooterWrapper]: hasAppFooter })}>
            <div className={cn(styles.layout, hasAppHeader ? styles.hasAppHeader : styles.withoutAppHeader )}>{children}</div>
        </div>
        {hasAppFooter && <DQFooter/>}
        </>
    )
}

export default Layout
