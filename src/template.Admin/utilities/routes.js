import ContactPageIcon from '@mui/icons-material/ContactPage';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

export const routes = {
	// routes from admin profile
	admin: [
		{
			text: 'User',
			icon: <PersonIcon color='primary' />,
			path: '/admin/user'
		},
		{
			text: 'Profile',
			icon: <ContactPageIcon color='primary' />,
			path: '/admin/profile'
		}
	],
	// routes from user profile
	manage: [
		{
			text: 'Country',
			icon: <FlagCircleIcon color='primary' />,
			path: '/admin/country'
		},
		{
			text: 'City',
			icon: <LocationCityIcon color='primary' />,
			path: '/admin/city'
		},
		{
			text: 'Client',
			icon: <PeopleIcon color='primary' />,
			path: '/admin/client'
		}
	],
	user: [],
	// routes from logged users
	authorized: {
		// default list to sidebar
		default: [
			{
				icon: <HomeIcon color='primary' />,
				path: '/'
			}
		],
		// custom component to sidebar
		routes: [
			{
				text: 'Settings',
				icon: <SettingsIcon color='primary' />,
				path: '/settings'
			}
		]
	},
	// public routes
	public: [
		{
			path: '/logout'
		},{
			path: '/charter'
		}
	]
}