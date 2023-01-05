
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { DataTable } from 'components/dataTable';
import { FilterData } from 'components/filterData';
import { FormModal } from 'components/formModal';
import { useAxios } from 'hooks/useAxios';
import { useEffect, useState } from 'react';

export default () => {
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [selected, setSelected] = useState(null);
	const [cityList, setCityList] = useState([]);

	const { palette } = useTheme();

	const columns = [
		{
			name: '#',
			width: '5%',
			selector: (row, index) => index + 1
		},
		{
			name: 'Client Name',
			selector: row => row.name
		},
		{
			name: 'City',
			selector: row => row.cityName
		},
		{
			name: 'CountryName',
			selector: row => row.countryName
		},
		{
			name: 'State',
			sx: row => ({ color: row.isActive ? palette.success.main : palette.error.light, fontWeight: 'bold' }),
			selector: row => row.isActive ? 'Enable' : 'Disable'
		}
	]

	const defaultClient = {
		name: '',
		cityId: ''
	}

	const axios = useAxios();

	useEffect(() => {
		getClients();
		getCityList();
	}, [])

	const getClients = () => {
		const url = 'client';

		axios
			.get(url)
			.then(({ data }) => {
				setData(data);
				setFilterData(data);
			})
			.catch(ex => console.error(ex));
	}

	const getCityList = () => {
		const url = 'city/list';

		axios
			.get(url)
			.then(({ data }) => {
				setCityList(data);
			})
			.catch(ex => console.error(ex));
	}

	const handleClickRow = (client) => client.selected ? setSelected(client) : setSelected(null);

	const handleSubmitForm = (data) => {
		const url = 'client';
		if (data.id) {
			axios
				.put(url, data)
				.then(({data}) => {
					if (data.code === 0) {
						swal({
							title: 'Success',
							icon: 'success',
							text: 'Client updated'
						})
							.then(() => getClients());
					}
				})
				.catch(ex => {
					swal({
						title: 'Error',
						icon: 'error',
						text: 'Client can not be updated'
					});
				});
		}
		else {
			axios
				.post(url, data)
				.then(({data}) => {
					if (data.code === 0) {
						swal({
							title: 'Success',
							icon: 'success',
							text: 'Client created'
						})
							.then(() => getClients());
					}
				})
				.catch(ex => {
					swal({
						title: 'Error',
						icon: 'error',
						text: 'Client can not be created'
					});
				});
		}
	}

	const handleFilter = (filterText) => {
		setFilterData(data.filter((client) => (
			client.name.toLowerCase().includes(filterText.toLowerCase()) ||
			client.cityName.toLowerCase().includes(filterText.toLowerCase()) ||
			client.countryName.toLowerCase().includes(filterText.toLowerCase())
		)))
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
						title="Add Client"
						text="Add Client"
						icon={<AddIcon sx={{ ml: 1 }} />}
						data={defaultClient}
						consts={{ cities: cityList }}
						width="30vw"
						Component={ContentForm}
						handleSubmit={handleSubmitForm} />
				</Grid>

				{
					selected !== null &&
					<Grid item xs={2}>
						<FormModal
							title="Update Client"
							text="Update Client"
							icon={<EditIcon sx={{ ml: 1 }} />}
							data={selected}
							consts={{ cities: cityList }}
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

const ContentForm = ({ data, handleChange, consts }) => {
	const [cities, setCities] = useState([]);

	useEffect(() => {
		setCities(consts.cities ? consts.cities : []);
	}, [consts])

	return (
		<Grid container justifyContent='center' spacing={1}>
			<Grid item xs={12}>
				<TextField
					label='Client Name'
					name='name'
					variant="outlined"
					value={data?.name}
					onChange={handleChange}
					fullWidth
					required />
			</Grid>
			
			<Grid item xs={12}>
				<FormControl fullWidth>
					<InputLabel id="city">City</InputLabel>
					<Select
						labelId="city"
						name='cityId'
						label="City"
						value={data?.cityId}
						onChange={handleChange}
						fullWidth
						required >
						<MenuItem value="">Empty</MenuItem>
						{
							cities.map((city) => {
								return (
									<MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
								);
							})
						}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	)
}