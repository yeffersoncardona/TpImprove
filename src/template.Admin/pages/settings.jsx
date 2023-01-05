import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Card, CardContent } from "@mui/material";
import { useStorage } from "hooks/useStorage";
import { Store } from "Providers/provider";
import { useContext, useEffect, useState } from "react";
import swal from "sweetalert";

export default () => {
	const [color, setColor] = useState('');

	const { theme, setTheme} = useContext(Store);
	const { setLocal } = useStorage();

	useEffect(() => {
		theme && setColor(theme);
	}, [])

	useEffect(() => {
		setTheme(color);
	}, [color])

	const saveTheme = () => {
		swal({
			title: 'Ok',
			icon: 'success',
			text: 'Theme saved'
		})
			.then(() => {
				setLocal('theme', color);
			})
	}

	return (
		<>
			<Grid container>
				<Grid item xs={4}>
					<Card width="1" >
						<CardContent>
							<Grid container spacing={1}>
								<Grid item xs>
									<FormControl fullWidth>
										<InputLabel size="small" id="theme">Theme</InputLabel>
										<Select
											size="small"
											labelId="theme"
											name='theme'
											label="Theme"
											value={color}
											onChange={e => setColor(e.target.value)}
											fullWidth
											required >
											<MenuItem value="blue">Blue</MenuItem>
											<MenuItem value="pink">Pink</MenuItem>
											<MenuItem value="teal">Teal</MenuItem>
											<MenuItem value="purple">Purple</MenuItem>
											<MenuItem value="orange">Orange</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs='auto'>
									<Button
										onClick={saveTheme}
										variant='contained' >
										Save
									</Button>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}