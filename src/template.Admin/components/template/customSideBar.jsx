import { Divider, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

export const CustomSideBar = ({ open, items }) => {
	const { push } = useRouter();
	
	return (
		<>
			{
				items.map((item, index) => {
					return (
						<Tooltip
							key={index}
							title={open ? null : item.text}
							placement="right" >
							<ListItem
								onClick={e => push(item.path) }
								button >								
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}} >
										{ item.icon }
									</ListItemIcon>								
								{ open && <ListItemText primary={item.text} /> }
							</ListItem>
						</Tooltip>
					)
				})
			}

			<Divider />
		</>
	);
}