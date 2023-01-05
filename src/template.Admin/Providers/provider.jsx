import { useStorage } from "hooks/useStorage";
import { createContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Themes } from "utilities/themes";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "authConfig";
import { MsalProvider } from "@azure/msal-react";
import { ProtectedRoutesProvider } from './protectedRoutesProvider';
import { useRouter } from "next/router";
import AxiosService from "services/AxiosService";

export const Store = createContext();

export const Provider = ({ children }) => {
	const [theme, setTheme] = useState('pink');
	const [profile, setProfile] = useState(null);
	const [permissions, setPermissions] = useState([]);
	const [clientId, setClientId] = useState();
	const [userName, setUserName] = useState('');

	const { getLocal, getSession, setSession } = useStorage();
	const { pathname } = useRouter();

	const [loading, setLoading] = useState(false);
	
	const msalInstance = new PublicClientApplication(msalConfig);
	const axiosService = new AxiosService();
	
    const [markets , setMarkets] = useState(null); //!: TPIMPROVE
    const [clients, setClients] = useState(null);
    const [lobs, setLobs] = useState(null);

	const [client, setClient] = useState('');
    const [Lob, setLob] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [periodicity, setPeriodicity] = useState('');

    const [projects, setProjects] = useState([]);

	const [marketSelected, setMarketSelected] = useState(null);

	const [view, setView] = useState(1);

    //Define constants
    const [projectName, setProjectName] = useState('');
    const [projectId, setProjectId] = useState('');
    const [projectCharterId, setProjectCharterId] = useState('');
    const [projecCharter, setProjectCharter] = useState('');

    const [clientSelected, setClientSelected] = useState(null);
    const [lobSelected, setLobSelected] = useState(null);

    const [projectSelected, setProjectSelected] = useState(null);

    //Analyze constants
    const [process, setProcess] = useState('');


	useEffect(() => {
		getSession('profile') && setProfile(getSession('profile'));
		getSession('permissions') && setPermissions(JSON.parse(getSession('permissions')));
		getSession('client') && setClientId(getSession('client'));
		getLocal('theme') ? setTheme(getLocal('theme')) : setTheme('pink');
	}, [pathname]);

	useEffect(() => {
		clientId && setSession('client', clientId);
	}, [clientId])





	const value = {
		profile, setProfile,
		theme, setTheme,
		permissions, setPermissions,
		clientId, setClientId, markets, setMarkets, clients, setClients, marketSelected, setMarketSelected, lobs, setLobs, projects, setProjects, userName, setUserName, client, setClient, Lob, setLob, startDate, setStartDate, endDate, setEndDate, periodicity, setPeriodicity, view, setView, projectName, setProjectName, projectId, setProjectId, projectCharterId, setProjectCharterId, projecCharter, setProjectCharter, clientSelected, setClientSelected, lobSelected, setLobSelected, projectSelected, setProjectSelected, process, setProcess
	}



	return (
		<Store.Provider value={value}>
			<ThemeProvider theme={createTheme(Themes[theme])}>
				<MsalProvider instance={msalInstance}>
					<ProtectedRoutesProvider>
						{ children }
					</ProtectedRoutesProvider>
				</MsalProvider>
			</ThemeProvider>
		</Store.Provider>
	);
}