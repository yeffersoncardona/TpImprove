import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import { useStorage } from 'hooks/useStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';


export const MenuProfile = ({ data }) => {
	const [menuEl, setMenuEl] = useState(null);
	const [userName, setUserName] = useState('');

	const open = Boolean(menuEl);
	const { push } = useRouter();
	const { logOut } = useAuth();
	const { getSession } = useStorage();

	useEffect(() => {
		setUserName(getSession('fullName'));
	}, []);

	const handleOpen = e => setMenuEl(e.currentTarget);
	const handleClose = () => setMenuEl(null);

	return (
		<>
			<IconButton onClick={handleOpen}>
				<MoreVertIcon sx={{ color: 'white' }} />
			</IconButton>
			<Menu
				open={open}
				anchorEl={menuEl}
				onClose={handleClose} >
				<MenuItem>
					<ListItemIcon>
						<AccountCircleIcon color='primary' />
					</ListItemIcon>
					{ userName }
				</MenuItem>

				<MenuItem onClick={e => push('/settings') }>
					<ListItemIcon>
						<SettingsIcon color='primary' />
					</ListItemIcon>
					Settings
				</MenuItem>

				<Divider />

				<MenuItem onClick={logOut} >
					<ListItemIcon>
						<LogoutIcon color='primary' />
					</ListItemIcon>
					Log out
				</MenuItem>
			</Menu>
		</>
	);
}