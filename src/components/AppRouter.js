import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
import Basket from '../pages/Basket';
import Admin from '../pages/Admin'; // Импортируем компонент Admin
import { Context } from '../index';

const AppRouter = () => {
    const {user} = useContext(Context) 
    console.log(user)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {/* Упрощаем роут для корзины */}
            <Route path="/basket" element={<Basket />} />
            {/* Добавляем роут для страницы администратора */}
            <Route path="/admin" element={<Admin />} />

            {/* Перенаправление на главную при переходе на несуществующую ссылку */}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
