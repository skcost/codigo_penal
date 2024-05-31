import React from 'react';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import logo from '../../imgs/logo_city.png';

const Header = () => (
		<AppBar role="banner" color="primary" position="static">
			<Toolbar>
				<Typography
						variant="h5"
						component="div"
						sx={{flexGrow: 1}}
				>
					Calculadora Penal
				</Typography>
				<img width={50} src={logo}  alt="Logo da city"/>
			</Toolbar>
		</AppBar>
);

export default Header;