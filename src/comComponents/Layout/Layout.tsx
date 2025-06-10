import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = 'with-nav radial-bg flex-center' }) => {
    const location = useLocation();

    const getActiveClass = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className={className}>
            {/* Навигация по проекту */}
            <nav className="project-nav">
                <div className="project-nav__links-wrapper">
                    <Link to="/" className={getActiveClass('/')}>
                        Форма добавления заявок
                    </Link>
                    <Link to="/table" className={getActiveClass('/table')}>
                        Таблица с заявками
                    </Link>
                    <Link to="/edit" className={getActiveClass('/edit')}>
                        Редактирование заявки
                    </Link>
                </div>
            </nav>

            {children}
        </div>
    );
};

export default Layout;