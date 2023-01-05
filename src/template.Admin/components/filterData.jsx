import ClearIcon from '@mui/icons-material/Clear';
import { Grid, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const FilterData = ({ setter = () => {}, data = [], filterProps = [], customFilter = () => {} }) => {
	const [filterText, setFilterText] = useState('');
	
	const handleFilter = () => {
		let response = [];
		if (filterText) {
			data.forEach(item => {
				filterProps.forEach(prop => {
					item[prop]?.toLowerCase().includes(filterText.toLowerCase()) && !response.includes(item) && response.push(item);
				});
			})
		}
		else response = data;		
		setter(response);
	}

	useEffect(() => {
		handleFilter();
		customFilter(filterText);
	}, [filterText])

	return (
		<>
			<Grid container spacing={1} >
				<Grid item xs>
					<TextField
						label='Filter'
						variant='standard'
						onChange={e => setFilterText(e.target.value)}
						value={filterText}
						fullWidth />
				</Grid>

				<Grid item xs='auto'>
					<IconButton
						onClick={e => setFilterText('')}
						color='primary' >
						<ClearIcon />
					</IconButton>
				</Grid>
			</Grid>
		</>
	);
}