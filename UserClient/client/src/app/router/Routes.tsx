import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import LoginPage from "../../features/login/LoginPage";
import EditPage from "../../features/catalog/EditPage";
import AddPage from "../../features/catalog/AddPage";
import RegisterPage from "../../features/register/RegisterPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> }, // Set HomePage as the default route
            { path: 'login', element: <LoginPage /> }, // Add login route
            { path: 'register', element: <RegisterPage /> }, // Add login route
            { path: 'about', element: <AboutPage /> },
            { path: 'edit', element: <EditPage /> },
            { path: 'add', element: <AddPage /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
]);