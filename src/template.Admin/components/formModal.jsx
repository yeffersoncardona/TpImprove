import { Grid, Button, Card, CardActions, CardContent, CardHeader, Divider, Modal } from "@mui/material";
import { useState, useEffect } from "react";

export const FormModal = ({
	title = "Pop Up",
	icon = null,
	text = "Pop Up",	
	width = null,
	// Data tp pass to component 
	data = {},
	consts = {},
	// Component to render
	Component,
	handleSubmit = () => {}
}) => {
	const [open, setOpen] =  useState(false);
	const [currentData, setCurrentData] = useState(data);

	useEffect(() => {
		setCurrentData(data);
	}, [data])

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleCurrentSubmit = e => {
		e.preventDefault();
		handleSubmit(currentData, e);
		setCurrentData(data);
		handleClose();
	}

	const handleCurrentCancel = e => {
		setCurrentData(data);
		handleClose();
	}
	
	const handleChange = e => {
		setCurrentData({ ...currentData, [e.target.name]: e.target.value });
	}

	return (
		<>
			<Button
				onClick={handleOpen}
				variant="contained"
				fullWidth >
					{ text } { icon }
			</Button>

			<Modal
				style={{
					display:'flex',
					alignItems:'center',
					justifyContent:'center'
				}}
				onClose={handleClose}
				open={open} >
				<Card sx={{ width: width }}>
					<form onSubmit={handleCurrentSubmit} style={{ width: '100%' }}>
						<CardHeader title={ title } sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center' }} />
						<CardContent>
							<Component data={currentData} handleChange={handleChange} consts={consts} />
						</CardContent>
						<Divider />
						<CardActions >
							<Grid container spacing={2} justifyContent='end'>
								<Grid item xs='auto'>
									<Button
										size="large"
										type="submit"
										variant='contained' >
										save
									</Button>
								</Grid>

								<Grid item xs='auto'>
									<Button
										size="large"
										color='secondary'
										onClick={handleCurrentCancel}
										variant='contained' >
										cancel
									</Button>
								</Grid>
							</Grid>
						</CardActions>
					</form>
				</Card>
			</Modal>
		</>
	);
}