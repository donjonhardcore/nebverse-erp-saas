import { useState, useEffect } from 'react';
const useDarkMode = () => {
	const [themeStatus, setThemeStatus] = useState('light');
	const [darkModeStatus, setDarkModeStatus] = useState(false);
	return { themeStatus, darkModeStatus };
};
export default useDarkMode;
