import { grey } from "@mui/material/colors"

const components = {
	MuiButton: {
		defaultProps: {
			sx: {
				textTransform: 'capitalize'
			}
		}
	}
}

export const Themes = {
	blue: {
		palette: {
			primary: {
				light: '#089BFF',
				main: '#253788',
				medium: '#2071D9',
				contrastText: '#fff'
			},
			secondary: {
				main: grey[500],
				contrastText: '#fff'
			}
		},
		components
	},
	teal: {
		palette: {
			primary: {
				light: '#8BE4BF',
				main: '#00462F',
				medium: '#00AF9B',
				contrastText: '#fff'
			},
			secondary: {
				main: grey[500],
				contrastText: '#fff'
			}
		},
		components
	},
	purple: {
		palette: {
			primary: {
				light: '#B384FF',
				main: '#740290',
				medium: '#7A32EE',
				contrastText: '#fff'
			},
			secondary: {
				main: grey[500],
				contrastText: '#fff'
			}
		},
		components
	},
	pink: {
		palette: {
			primary: {
				light: '#FFB8DC',
				main: '#ff0579',
				medium: '#FF0082',
				contrastText: '#fff'
			},
			secondary: {
				main: grey[500],
				contrastText: '#fff'
			}
		},
		components
	},
	orange: {
		palette: {
			primary: {
				light: '#FF8F00',
				main: '#CF402C',
				medium: '#FF6F00',
				contrastText: '#fff'
			},
			secondary: {
				main: grey[500],
				contrastText: '#fff'
			}
		},
		components
	}
}