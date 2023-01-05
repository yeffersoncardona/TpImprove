import { Box, Collapse, Divider, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { PrimaryRole } from "config";
import { useRouter } from "next/router";
import { Store } from "Providers/provider";
import { useContext, useEffect, useState } from "react";
import { routes } from "utilities/routes";

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ProfileSideBar = ({ open }) => {
	const [navRoutes, setNavRoutes] = useState({});

	const { push } = useRouter();
	const { profile, permissions } = useContext(Store);

	const handleCollapse = key => {
		setNavRoutes({ ...navRoutes, [key]: { ...navRoutes[key], open: !navRoutes[key].open } });
	}

	useEffect(() => {
		setNavRoutes(null);
		if (profile !== null) {
			if (profile === PrimaryRole) {
				const filterKeys = Object.keys(routes).filter(key => key !== 'public' & key !== 'authorized');
	
				filterKeys.forEach(key => {
					routes[key].length > 0 && setNavRoutes(prev => prev = { ...prev, [key]: { title: key, routes: routes[key], open: true }});
				});
			}
			else {
				permissions.forEach(section => {
					routes[section]?.length > 0 && setNavRoutes(prev => prev = { ...prev, [section]: { title: section, routes: routes[section], open: true }});
				});
			}
		}
	}, [profile])

	return (
		<>
			{
				Object.keys(navRoutes).map((section, index) => {
					return (
						<Box key={index}>
							<Tooltip
								title={open ? null : navRoutes[section].title}
								placement="right" >
									<ListItem
										onClick={e => handleCollapse(section) }
										button >
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
											}} >
											{
												navRoutes[section].open
												?	<ExpandLessIcon sx={{ color: 'primary.medium' }} />
												: <ExpandMoreIcon sx={{ color: 'primary.medium' }} />
											}
										</ListItemIcon>
										{ open && <ListItemText sx={{ textTransform: 'capitalize' }} primary={navRoutes[section].title} /> }
									</ListItem>
							</Tooltip>
							<Collapse in={navRoutes[section].open}>
									{
										navRoutes[section].routes.map((route, index) => {
											return (
												<Tooltip
													key={index}
													title={open ? null : route.text}
													placement="right" >
													<ListItem
														onClick={e => push(route.path) }
														button >
														<ListItemIcon
															sx={{
																minWidth: 0,
																mr: open ? 3 : 'auto',
																justifyContent: 'center',
															}} >
															{ route.icon }
														</ListItemIcon>
														{ open && <ListItemText primary={route.text} /> }
													</ListItem>
												</Tooltip>
											)
										})
									}
								</Collapse>
								<Divider />
						</Box>
					)
				})
			}
		</>
	);
}