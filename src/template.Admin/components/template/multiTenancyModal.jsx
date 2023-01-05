import { Modal, Card, CardContent, Grid, Divider, IconButton, CardActions, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import { useStorage } from "hooks/useStorage";
import { PrimaryRole } from "config";
import { Store } from "Providers/provider";
import { useAxios } from "hooks/useAxios";

export const MultiTenancyModal = () => {
	const [open, setOpen] = useState(false);
	const [clientLsit, setClientList] = useState([]);
	const [currentClient, setCurrentClient] = useState('');
	
	const { profile, clientId, setClientId } = useContext(Store);
	const axios = useAxios();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const getClientList = () => {
		const url = 'client/list';
		axios
			.get(url)
			.then(({ data }) => {
				setClientList(data);
			})
			.catch(ex => console.error(ex));
	}

	const setGlobalClient = e => {
		e.preventDefault();
		setClientId(currentClient);
		setOpen(false);
	}

	useEffect(() => {
		profile && getClientList();
	}, [])

	useEffect(() => {
		clientId ? setCurrentClient(clientId) : setOpen(true);
	}, [clientId])

	return (
		profile === PrimaryRole &&
		<>
			<IconButton
				onClick={handleOpen} >
				<EditAttributesIcon sx={{ color: 'white' }} />
			</IconButton>

			<Modal
				open={open}
				sx={{
					display:'flex',
					alignItems:'center',
					justifyContent:'center'
				}} >
					<Card sx={{ width: '25vw' }}>
						<form onSubmit={setGlobalClient} style={{ width: '100%' }}>
							<CardContent>
								<FormControl fullWidth>
									<InputLabel size="small" id="clientId">Client</InputLabel>
									<Select
										size="small"
										labelId="clientId"
										name='clientId'
										label="Client"
										value={currentClient}
										onChange={e => setCurrentClient(e.target.value)}
										fullWidth
										required >
										{
											clientLsit.map((item, index) => {
												return (
													<MenuItem key={index} value={item.id}>{item.name}</MenuItem>
												)
											})
										}
									</Select>
								</FormControl>
							</CardContent>

							<Divider />

							<CardActions sx={{  }} >
								<Grid container justifyContent='end' spacing={1}>
									<Grid item xs='auto'>
										<Button
											type="submit"
											color="primary"
											variant="contained" >
												select
										</Button>
									</Grid>

									{
										clientId &&
										<Grid item xs='auto'>
											<Button
												onClick={handleClose}
												color="secondary"
												variant="contained" >
													close
											</Button>
										</Grid>
									}
								</Grid>
							</CardActions>
						</form>
					</Card>
			</Modal>
		</>
	)
}