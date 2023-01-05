import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { DataTable } from 'components/dataTable';
import { FilterData } from 'components/filterData';
import { FormModal } from 'components/formModal';
import { useAxios } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

export default () => {
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [selected, setSelected] = useState(null);

	const axios = useAxios();
	const { palette } = useTheme();

	const columns = [
		{
			name: '#',
			width: '5%',
			selector: (row, index) => index + 1
		},
		{
			name: 'Country Name',
			selector: row => row.name
		},
		{
			name: 'State',
			sx: row => ({ color: row.isActive ? palette.success.main : palette.error.light, fontWeight: 'bold' }),
			selector: row => row.isActive ? 'Enable' : 'Disable'
		}
	]

	const defaultCountry = {
		name: ''
	}

	const getCountries = () => {
		setSelected(null);

		const url = 'country';

		axios
			.get(url)
			.then(({ data }) => {
				console.log(data);
				setData(data);
				setFilterData(data);
			})
			.catch(ex => console.error(ex));
	}

	useEffect(() => {
		getCountries();
	}, [])

	const handleSubmitForm = async (country) => {
		const url = 'country';

		if (country.id) {
			try {
				const { data } = await axios.put(url, country);
				if (data.code === 0) {
					swal({
						title: 'Success',
						text: 'Country updated',
						icon: 'success' 
					})
					.then(() => {
						getCountries();
					})
				}
			}
			catch (ex) {
				swal({
					title: 'Error',
					text: 'Country can not updated',
					icon: 'error' 
				});
			}
		}
		else {
			try {
				const { data } = await axios.post(url, country);
				if (data.code == 0) {
					swal({
						title: 'Success',
						text: 'Country created',
						icon: 'success' 
					})
					.then(() => {
						getCountries();
					})
				}
			}
			catch (ex) {
				swal({
					title: 'Error',
					text: 'Country can not created',
					icon: 'error' 
				});
			}
		}
	}

	const handleClickRow = (country) => country.selected ? setSelected(country) : setSelected(null);

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
						title="Add Country"
						text="Add Country"
						icon={<AddIcon sx={{ ml: 1 }} />}
						data={defaultCountry}
						width="30vw"
						Component={ContentForm}
						handleSubmit={handleSubmitForm} />
				</Grid>

				{
					selected !== null &&
					<Grid item xs={2}>
						<FormModal
							title="Update Country"
							text="Update Country"
							icon={<EditIcon sx={{ ml: 1 }} />}
							data={selected}
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
					data={filterData}
					selectRow={true}
					handleSelectRow={handleClickRow} />
			</Grid>
		</Grid>
	);
}

const ContentForm = ({ data, handleChange }) => {
	return (
		<Grid container justifyContent='center' spacing={1}>
			<Grid item xs={12}>
				<TextField
					label='Country Name'
					name='name'
					variant="outlined"
					value={data?.name}
					onChange={handleChange}
					fullWidth
					required />
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
	)
}