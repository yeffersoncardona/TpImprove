import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { DataTable } from 'components/dataTable';
import { FilterData } from 'components/filterData';
import { FormModal } from 'components/formModal';
import { useAxios } from 'hooks/useAxios';
import { useEffect, useState } from 'react';

export default () => {
	const [users, setUsers] = useState([]);
	const [currentUsers, setCurrentUsers] = useState([]);
	const [selected, setSelected] = useState(null);
	const [profileList, setProfileList] = useState([]);
	const [clientList, setClientList] = useState([]);

	const axios = useAxios();
	const { palette } = useTheme();

	const columns = [
		{
			name: '#',
			width: '5%',
			selector: (row, index) => index + 1
		},
		{
			name: 'User name',
			selector: row => row.userName
		},
		{
			name: 'Full name',
			selector: row => row.fullName
		},
		{
			name: 'Profile',
			selector: row => row.profileName
		},
		{
			name: 'Client',
			selector: row => row.clientName
		},
		{
			name: 'State',
			sx: row => ({ color: row.isActive ? palette.success.main : palette.error.light, fontWeight: 'bold' }),
			selector: row => row.isActive ? 'Enable' : 'Disable'
		}
	]

	const getUsers = () => {
		axios.get('user')
			.then(({ data }) => {
				setUsers(data);
				setCurrentUsers(data);
			})
	}

	useEffect(() => {
		getUsers();
		axios.get('profile/list').then(({ data }) => setProfileList(data));
		axios.get('client/list').then(({ data }) => setClientList(data));
	}, [])

	const handleClickRow = (row) => {
		setSelected(null)
		row.selected && setSelected(row);
	}

	const handleSubmitForm = async (user) => {
		const url = "user";
		try {
			if (user.id) await axios.put(url, user);
			else await axios.post(url, user);
		}
		catch (ex) {
			console.error(ex);
		}
		finally {
			getUsers();
		}
	}

	return (
		<Grid container spacing={1}>
			<Grid container alignItems='center' spacing={1} item xs={12}>
				<Grid item xs>
					<FilterData
						setter={setCurrentUsers}
						data={users}
						filterProps={['userName', 'fullName', 'profileName']} />
				</Grid>

				<Grid item xs={2}>
					<FormModal
						title="Add User"
						text="Add User"
						icon={<AddIcon sx={{ ml: 1 }} />}
						data={{	userName: '', fullName: '', profileId: '', clientId: '' }}
						consts={{ profiles: profileList, clients: clientList }}
						width="30vw"
						Component={ContentForm}
						handleSubmit={handleSubmitForm} />
				</Grid>

				{
					selected !== null &&
					<Grid item xs={2}>
						<FormModal
							title="Update User"
							text="Update"
							icon={<EditIcon sx={{ ml: 1}} />}
							data={selected}
							consts={{ profiles: profileList, clients: clientList }}
							width="30vw"
							Component={ContentForm}
							handleSubmit={handleSubmitForm} />
					</Grid>
				}
			</Grid>

			<Grid sx={{ mt: 1, mb: 1}} item xs={12}>
				<Divider />
			</Grid>

			<Grid item xs={12}>
				<DataTable
					columns={columns}
					data={currentUsers}
					selectRow={true}
					handleSelectRow={handleClickRow} />
			</Grid>
		</Grid>
	);
}

const ContentForm = (props) => {
	return (
		<>
			<Grid container justifyContent='center' spacing={1}>
				<Grid item xs={12}>
					<TextField
						label='User Name'
						name='userName'
						variant="outlined"
						value={props.data?.userName}
						onChange={props.handleChange}
						fullWidth
						required />
				</Grid>

				<Grid item xs={12}>
					<TextField
						label='Full Name'
						name='fullName'
						variant="outlined"
						value={props.data?.fullName}
						onChange={props.handleChange}
						fullWidth
						required />
				</Grid>

				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="profile">Profile</InputLabel>
						<Select
							labelId="profile"
							name='profileId'
							label="Profile"
							value={props.data?.profileId}
							onChange={props.handleChange}
							fullWidth
							required >
							<MenuItem value={null}>Empty</MenuItem>
							{
								props.consts.profiles.map((profile, index) => {
									return (
										<MenuItem key={profile.id} value={profile.id}>{profile.name}</MenuItem>
									);
								})
							}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="clientId">Client</InputLabel>
						<Select
							labelId="clientId"
							name='clientId'
							label="Client"
							value={props.data?.clientId}
							onChange={props.handleChange}
							fullWidth >
							<MenuItem value={null}>Empty</MenuItem>
							{
								props.consts.clients.map((client, index) => {
									return <MenuItem key={index} value={client.id}>{client.name}</MenuItem>
								})
							}
						</Select>
					</FormControl>
				</Grid>

				{
					props.data.id &&
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id="state">State</InputLabel>
							<Select
								labelId="state"
								name='isActive'
								label="State"
								value={props.data?.isActive}
								onChange={props.handleChange}
								fullWidth
								required >
								<MenuItem value={true}>Eneable</MenuItem>
								<MenuItem value={false}>Disable</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				}
			</Grid>
		</>
	);
}
