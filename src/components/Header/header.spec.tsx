import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from './index';

test('should render header items', () => {
	render(<Header />);
	const banner = screen.getByRole('banner');
	const logo = screen.getByRole("img");

	expect(banner).toHaveTextContent(/calculadora penal/i);
	expect(logo).toBeInTheDocument();
	expect(logo).toHaveAttribute("alt", "Logo da city");
});
