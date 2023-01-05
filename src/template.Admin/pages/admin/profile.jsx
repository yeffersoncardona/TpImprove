import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme, Chip } from '@mui/material';
import { DataTable } from 'components/dataTable';
import { FilterData } from 'components/filterData';
import { FormModal } from 'components/formModal';
import { useAxios } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { routes } from 'utilities/routes';

export default () => {
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [selected, setSelected] = useState(null);

	const columns = [
		{
			name: '#',
			width: '5%',
			selector: (row, index) => index + 1
		},
		{
			name: 'Name',
			selector: row => row.name
		},
		{
			name: 'Permission',
			selector: row => row.permissions.map((item, index) => {
				return (
					<Chip key={index} sx={{ textTransform: 'capitalize', bgcolor: row.selected ? palette.primary.main : palette.primary.light, color: row.selected ? 'white' : null, fontWeight: 'bold', ml: 0.5 }} label={item} />
				)
			})			
		},
		{
			name: 'State',
			sx: row => ({ color: row.isActive ? palette.success.main : palette.error.light, fontWeight: 'bold' }),
			selector: row => row.isActive ? 'Enable' : 'Disable'
		}
	]

	const defaultProfile = {
		name: '',
		permissions: []
	}

	const { palette } = useTheme();
	const axios = useAxios();

	const getProfiles = () => {
		setSelected(null);
		
		const url = "profile";

		axios
			.get(url)
			.then(({ data }) => {
				const profiles = data.map(profile => {
					profile.permissions = profile.permissions ? JSON.parse(profile.permissions) : [];
					return profile;
				})
				setData(profiles);
				setFilterData(profiles);
			})
			.catch(ex => console.error(ex));
	}

	useEffect(() => {
		getProfiles();
	}, [])
	
	const handleSelectRow = (profile) => {
		setSelected(null);
		profile.selected && setSelected(profile)
	}

	const handleSubmitForm = (data) => {
		const url = 'profile';

		const profile = data;
		profile.permissions = JSON.stringify(profile.permissions);

		if (data.id) {
			axios
				.put(url, profile)
				.then(() => {
					swal({
						title: 'Success',
						text: 'Profile updated',
						icon: 'success'
					})
					.then(() => {
						getProfiles();
					})
				})
				.catch(ex => {
					swal({
						title: 'Error',
						text: 'Someting goes wrong!!',
						icon: 'error'
					})
				});
		}
		else {
			axios
				.post(url, profile)
				.then(() => {
					swal({
						title: 'Success',
						text: 'Profile created',
						icon: 'success'
					})
					.then(() => {
						getProfiles();
					})
				})
				.catch(ex => {
					console.error(ex);
					swal({
						title: 'Error',
						text: 'Someting goes wrong!!',
						icon: 'error'
					})
				});
		}
	}
	
	return (
		<Grid container spacing={1}>
			<Grid container alignItems='center' spacing={1} item xs={12}>
				<Grid item xs>
					<FilterData
						setter={setFilterData}
						data={data}
						filterProps={['name']} />
				</Grid>

				<Grid item xs={2}>
					<FormModal
						title="Add Profile"
						text="Add profile"
						icon={<AddIcon sx={{ ml: 1}} />}
						data={defaultProfile}
						width="30vw"
						Component={ProfileForm}
						handleSubmit={handleSubmitForm} />
				</Grid>

				{
					selected !== null &&
					<Grid item xs={2}>
						<FormModal
							title="Update Profile"
							text="Update profile"
							icon={<EditIcon sx={{ ml: 1}} />}
							data={selected}
							width="30vw"
							Component={ProfileForm}
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
					data={filterData}
					selectRow={true}
					handleSelectRow={handleSelectRow} />
			</Grid>
		</Grid>
	);
}

const ProfileForm = ({ data, handleChange}) => {
	const [sections, setSections] = useState([]);

	useEffect(() => {
		setSections(Object.keys(routes).filter(section => section != 'authorized' && section != 'public' ));
	}, [])
	return (
		<>
			<Grid container justifyContent='center' spacing={1}>
				<Grid item xs={12}>
					<TextField
						label='Profile Name'
						name='name'
						variant="outlined"
						value={data?.name}
						onChange={handleChange}
						fullWidth
						required />
				</Grid>

				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="permisions">Permission</InputLabel>
						<Select
							labelId="permisions"
							name='permissions'
							label="Permission"
							value={data?.permissions}
							onChange={handleChange}
							multiple
							fullWidth
							required >
							{
								sections.map((item, index) => {
									return (
										<MenuItem key={index} value={item}>{ item }</MenuItem>
									)
								})
							}
						</Select>
					</FormControl>
				</Grid>

				{
					data.id &&
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id="state">State</InputLabel>
							<Select
								labelId="state"
								name='isActive'
								label="State"
								value={data?.isActive}
								onChange={handleChange}
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