import { Alert, AlertTitle, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

export const DataTable = ({
	data = null,
	size = null,
	columns = [],
	hover = false,
	handlePageChange = () => {},
	handleRowsPerPageChange = () => {},
	rowsPerPageOptions = [],
	count = data.length,
	rowsPerPage = 10,
	page = 0,
	pagination = false,
	selectRow = false,
	handleSelectRow = () => {}
}) => {
	const [currentData, setCurrentData] = useState([]);

	useEffect(() => (data ? setCurrentData(data) : setCurrentData([])), [data]);

	const clickRow = (row, index) => {
		if (selectRow) {
			const newData = currentData.map((row, i) => ({ ...row, selected: i === index ? !row.selected : false }));

			const currentRow = newData.filter((row, i) => i === index)[0];

			setCurrentData(newData);
			handleSelectRow(currentRow);
		}
	}

	return (
		<>
			{
				columns.length > 0 ?
				<Table size={size}>
					<TableHead>
						<TableRow sx={{ bgcolor: 'primary.main' }}>
							{
								columns.map((column, index) => {
									return (
										<TableCell key={index} sx={{ color: 'white', fontWeight: 'bold' }} width={column.width} >
											{ column.name }
										</TableCell>
									)
								})
							}
						</TableRow>
					</TableHead>

					<TableBody>
						{
							currentData.map((row, i) => {
								return (
									<TableRow
										key={i}
										onClick={e => clickRow(row, i)}
										hover={hover} sx={{ bgcolor: row.selected ? 'primary.light' : null, cursor: selectRow ? 'pointer' : null }} >
										{
											columns.map((cell, j) => {
												return (
													<TableCell
														key={j}
														sx={ typeof cell.sx === 'function' ? cell.sx(row) : cell.sx } >
														{ cell.selector(row, i) }
													</TableCell>
												)
											})
										}
									</TableRow>
								)
							})
						}
					</TableBody>
					{
						pagination &&
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={rowsPerPageOptions}
									colSpan={columns.length}
									count={count}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{ native: true }}
									// ActionsComponent={TablePaginationActions}
									onPageChange={handlePageChange}
									onRowsPerPageChange={handleRowsPerPageChange} />
							</TableRow>
						</TableFooter>
					}
				</Table>
				:
				<Alert severity='info'>
					<AlertTitle>Table Info</AlertTitle>
					No data to show
				</Alert>
			}
		</>
	);
}