import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function NavItem({ item, activeKey, locked }) {
    const Icon = item.icon;
    const isActive = item.key === activeKey;
    const isLink = Boolean(item.to) && (!locked || item.alwaysOn);

    const className = [styles.item, isActive && styles.active, !isActive && !isLink && styles.dimmed]
        .filter(Boolean)
        .join(' ');

    const content = (
        <>
            {Icon && <Icon size={18} aria-hidden="true" />}
            <span>{item.label}</span>
        </>
    );

    if (isLink) {
        return (
            <Link to={item.to} className={className} aria-current={isActive ? 'page' : undefined}>
                {content}
            </Link>
        );
    }

    return (
        <span
            className={className}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={!isActive}
        >
            {content}
        </span>
    );
}

export default function Sidebar({
    items,
    bottomItems = [],
    activeKey,
    theme = 'student',
    side = 'left',
    logo = null,
    logoAlt = 'EStudy',
    user = null,
    locked = false,
    lockedMessage = '',
    label = 'Main navigation',
}) {
    const className = [styles.sidebar, styles[theme], styles[side]].filter(Boolean).join(' ');
    const initial = (user?.fullName || '?').charAt(0).toUpperCase();

    return (
        <aside className={className}>
            {logo && (
                <div className={styles.brand}>
                    <img src={logo} alt={logoAlt} className={styles.logo} />
                </div>
            )}

            {locked && lockedMessage && <p className={styles.notice}>{lockedMessage}</p>}

            <nav className={styles.nav} aria-label={label}>
                {items.map((item) => (
                    <NavItem key={item.key} item={item} activeKey={activeKey} locked={locked} />
                ))}
            </nav>

            {(bottomItems.length > 0 || user) && (
                <div className={styles.bottom}>
                    {bottomItems.map((item) => (
                        <NavItem key={item.key} item={item} activeKey={activeKey} locked={locked} />
                    ))}

                    {user && (
                        <div className={styles.userCard}>
                            <span className={styles.avatar} aria-hidden="true">{initial}</span>
                            <div>
                                <p className={styles.userName}>{user.fullName}</p>
                                {user.roleLabel && <p className={styles.userRole}>{user.roleLabel}</p>}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </aside>
    );
}