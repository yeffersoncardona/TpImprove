import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
    AppBar,
    Container,
    Drawer,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import { MultiTenancyModal } from 'components/template/multiTenancyModal';
import { Title } from 'config';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { SideBar } from './sideBar';

import { MenuProfile } from './menuProfile';
import ProjectSelector from 'components/project_selector/ProjectSelector';
import Nav from 'components/nav/Nav';
import { useStorage } from 'hooks/useStorage';
import Filter from 'components/filter/Filter';
import Process from 'components/process/Process';
import Define from 'components/define/Define';
import Analyze from 'components/analyze/Analyze';
import Improve from 'components/improve/Improve';
import Measure from 'components/measure/Measure';
import Control from 'components/control/Control';
import { Store } from 'Providers/provider';

export const Template = ({ children, title = '' }) => {
    const { getSession } = useStorage();
    const storage = useContext(Store);

    const { userName, setUserName, client, setClient, Lob, setLob, startDate, setStartDate, endDate, setEndDate, periodicity, setPeriodicity, marketSelected, setMarketSelected, view, setView, projectName, setProjectName, projectId, setProjectId, projectCharterId, setProjectCharterId, projecCharter, setProjectCharter, clientSelected, setClientSelected, lobSelected, setLobSelected, projectSelected, setProjectSelected, process, setProcess
    } = storage;

    const [openDrawer, setOpenDrawer] = useState(true);


    const handleDrawer = () => setOpenDrawer(!openDrawer);

    useEffect(() => {
        setUserName(getSession('fullName'));

        const client = sessionStorage.getItem('client');
        if (client) {
            setClient(client);
        }

        const Lob = sessionStorage.getItem('Lob');
        if (Lob) {
            setLob(Lob);
        }
        const startDate = sessionStorage.getItem('startDate');
        if (startDate) {
            setStartDate(startDate);
        }
        const endDate = sessionStorage.getItem('endDate');
        if (endDate) {
            setEndDate(endDate);
        }
    }, []);

    useEffect(() => {
        if (projectSelected) {
            setProjectName(projectSelected.projectName);
            setProjectId(projectSelected.idProject);
/*             setProjectCharterId(projectSelected.projectCharterId);
            setProjectCharter(projectSelected.projecCharter); */
        }
    }, [projectSelected]);

    return (
        <>
            <Head>
                <title> {Title} </title>
            </Head>

            <div className="main_container">
                <Nav
                    userName={userName}
                    setView={setView}
                    view={view}
                    setClient={setClient}
                    setLob={setLob}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
                {view === 1 && <ProjectSelector setView={setView}clientSelected={clientSelected} setClientSelected={setClientSelected} lobSelected={lobSelected} setLobSelected={setLobSelected} setStartDate={setStartDate} setEndDate={setEndDate} projectSelected={projectSelected} setProjectSelected={setProjectSelected} />}

                {view !== 1 && (
                    <>
                        <Filter
                            client={client}
                            setClient={setClient}
                            Lob={Lob}
                            setLob={setLob}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            periodicity={periodicity}
                            setPeriodicity={setPeriodicity}
                            marketSelected={marketSelected}
                            clientSelected={clientSelected}
                            lobSelected={lobSelected}
                        />
                        {clientSelected && lobSelected && startDate && endDate && (
                            <Process view={view} setView={setView} />
                        )}
                    </>
                )}

                {clientSelected && lobSelected && startDate && endDate && view === 2 && (
                    <h1>Six Sigma</h1>
                )}
                {clientSelected && lobSelected && startDate && endDate && view === 3 && (
                    <h1>Impact Analysis</h1>
                )}
                {clientSelected && lobSelected && startDate && endDate && view === 4 && (
                    <Define
                        projectName={projectName}
                        setProjectName={setProjectName}
                        projectId={projectId}
                        setProjectId={setProjectId}
                        projectCharterId={projectCharterId}
                        setProjectCharterId={setProjectCharterId}
                        projecCharter={projecCharter}
                        projectSelected={projectSelected}
                    />
                )}
                {clientSelected && lobSelected && startDate && endDate && view === 5 && (
                    <Measure />
                )}
                {clientSelected && lobSelected && startDate && endDate && view === 6 && (
                    <Analyze process={process} setProcess={setProcess} />
                )}
                {clientSelected && lobSelected && startDate && endDate && view === 7 && (
                    <Improve />
                )}
                {clientSelected && lobSelected && startDate && endDate && view === 8 && (
                    <Control />
                )}
            </div>
        </>
    );
};

{
    /* 			<Head>
				<title> { Title } - { title.toLowerCase() } </title>
			</Head>

			<AppBar>
				<Toolbar >
					<Grid container alignItems='center' >
						<Grid item xs='auto'>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
								onClick={handleDrawer} >
								{
									openDrawer
									? <ChevronLeftIcon />
									: <ChevronRightIcon />
								}
							</IconButton>
						</Grid>

						<Grid item xs>
							<Typography variant="h6" sx={{ flexGrow: 1, textTransform: 'capitalize' }}>
								{ title }
							</Typography>
						</Grid>


						<Grid item xs='auto'>
							<MultiTenancyModal />
						</Grid>

						<Grid item xs='auto'>
							<MenuProfile />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					"& .MuiDrawer-paper": {
						width: openDrawer ? 180 : 'auto',
						boxSizing: "border-box",
					},
					position: 'fixed',					
					zIndex: 1,
				}}
				variant="permanent"
				open={openDrawer} >
				<Toolbar />
				<SideBar open={openDrawer} />
			</Drawer>
			<Container
				maxWidth="auto"
        style={{
					marginTop: "75px",
					minHeight: "86vh"
				}} >
				<main
					style={{
						marginLeft: openDrawer ? 180 : 60,
					}} >
					{ children }
				</main>
			</Container> */
}
