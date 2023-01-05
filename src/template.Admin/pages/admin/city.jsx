import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, Grid, TextField, useTheme, FormControl, InputLabel, Select,  MenuItem } from '@mui/material';
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
	const [countryList, setCountryList] = useState([]);

	const axios = useAxios();
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
			name: 'Country Name',
			selector: row => row.countryName
		},
		{
			name: 'State',
			sx: row => ({ color: row.isActive ? palette.success.main : palette.error.light, fontWeight: 'bold' }),
			selector: row => row.isActive ? 'Enable' : 'Disable'
		}
	]

	const defaultCity = {
		name: '',
		countryId: ''
	}

	const getCities = () => {
		setSelected(null);

		const url = 'city';

		axios
			.get(url)
			.then(({ data }) => {
				setData(data);
				setFilterData(data);
			})
			.catch(ex => console.error(ex));
	}

	const getCountriesList = () => {		
		const url = 'country/list';

		axios
			.get(url)
			.then(({ data }) => {
				setCountryList(data);
			})
			.catch(ex => console.error(ex));
	}

	useEffect(() => {
		getCities();
		getCountriesList();
	}, [])

	const handleClickRow = (city) => city.selected ? setSelected(city) : setSelected(null);

	const handleFilter = (filterText) => {
		const _filterData = data.filter(item => (
			item.name.toLowerCase().includes(filterText.toLowerCase()) ||
			item.countryName.toLowerCase().includes(filterText.toLowerCase())
		));

		setFilterData(_filterData);
	}

	const handleSubmitForm = async (city) => {
		const url = 'city';

		if (city.id) {
			try {
				const { data } = await axios.put(url, city);
				if (data.code === 0) {
					swal({
						title: 'Success',
						text: 'Country updated',
						icon: 'success' 
					})
					.then(() => {
						getCities();
					})
				}
			}
			catch (ex) {
				swal({
					title: 'Error',
					text: 'city can not updated',
					icon: 'error' 
				});
			}
		}
		else {
			try {
				const { data } = await axios.post(url, city);
				if (data.code === 0) {
					swal({
						title: 'Success',
						text: 'Country created',
						icon: 'success' 
					})
					.then(() => {
						getCities();
					})
				}
			}
			catch (ex) {
				swal({
					title: 'Error',
					text: 'city can not created',
					icon: 'error' 
				});
			}
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
						title="Add City"
						text="Add City"
						icon={<AddIcon sx={{ ml: 1 }} />}
						data={defaultCity}
						consts={{ countries: countryList }}
						width="30vw"
						Component={ContentForm}
						handleSubmit={handleSubmitForm} />
				</Grid>

				{
					selected !== null &&
					<Grid item xs={2}>
						<FormModal
							title="Update City"
							text="Update City"
							icon={<EditIcon sx={{ ml: 1 }} />}
							data={selected}
							consts={{ countries: countryList }}
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

const ContentForm = ({ data, handleChange, consts}) => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		setCountries(consts.countries ? consts.countries : []);
	}, [consts])

	return (
		<Grid container justifyContent='center' spacing={1}>
			<Grid item xs={12}>
				<TextField
					label='City Name'
					name='name'
					variant="outlined"
					value={data?.name}
					onChange={handleChange}
					fullWidth
					required />
			</Grid>

			<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="countries">Country</InputLabel>
						<Select
							labelId="countries"
							name='countryId'
							label="Country"
							value={data?.countryId}
							onChange={handleChange}
							fullWidth
							required >
							<MenuItem value="">Empty</MenuItem>
							{
								countries.map((item, index) => {
									return (
										<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
									);
								})
							}
						</Select>
					</FormControl>
				</Grid>
		</Grid>
	);
}