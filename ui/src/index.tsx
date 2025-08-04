import React from 'react';
// import ReactDOM from 'react-dom'; // For React 17
import { createRoot } from 'react-dom/client'; // For React 18
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/styles.scss';
import App from './App/App';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './contexts/themeContext';
import { AuthContextProvider } from './contexts/authContext';
import './i18n';

const children = (
	<AuthContextProvider>
		<ThemeContextProvider>
			<Router>
				<React.StrictMode>
					<Routes>
						{/* Public routes */}
						<Route path="/auth-pages/login" element={<Login />} />
						<Route path="/auth-pages/sign-up" element={<Register />} />
						
						{/* Protected routes */}
						<Route
							path="/*"
							element={
								<ProtectedRoute>
									<App />
								</ProtectedRoute>
							}
						/>
						

					</Routes>
				</React.StrictMode>
			</Router>
		</ThemeContextProvider>
	</AuthContextProvider>
);

const container = document.getElementById('root');

// ReactDOM.render(children, container); // For React 17
createRoot(container as Element).render(children); // For React 18

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
