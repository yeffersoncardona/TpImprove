import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { tokenScope } from 'authConfig';
import { useRouter } from "next/router";
import { Store } from "Providers/provider";
import { useContext } from "react";
import swal from 'sweetalert';
import { useAxios } from "./useAxios";
import { useStorage } from "./useStorage";

export const useAuth = () => {

	const isAuthenticated = useIsAuthenticated();
	const { instance, accounts } = useMsal();
	const { setProfile, setPermissions, setClientId } = useContext(Store);
	const storage = useStorage();
	const { axiosClient } = useAxios();
	const { push } = useRouter();

	const isExist = (username) => {
		return new Promise((res, rej) => {
			const url = 'oauth/isExists';
			axiosClient()
				.post(url, { username })
				.then(response => {
					console.log('response----', response);
					if (response.data) res(response);
					else {
						error();
						rej(response);
					}
				})
				.catch(ex => {
					error(ex);
					rej(ex);
				})
		})
	}

	const ccmsLogin = (username, password) => {
		return new Promise((res, rej) => {
			const url = 'oauth/dev';

			axiosClient()
				.post(url, { username, password})
				.then(response => {
					setSession(username, response.data);
					res(response);
				})
				.catch(ex => {
					error(ex);
					rej(ex);
				})
		})
	}

	const mfaLogin = () => {
		return new Promise((res, rej) => {
			instance.loginPopup()
				.then((mfaResponse) => {
					getMfaToken(mfaResponse.account)
						.then(oauthResponse => {
							res(mfaResponse, oauthResponse);
						})
						.catch(ex => {
							error(ex);
							rej(ex);
						})
				} )
				.catch(ex => {
					error(ex);
					rej(ex);
				});
		})
	}

	const getMfaToken = (account) => {
		return new Promise((res, rej) => {
			const accessTokenRequest = {
				scopes: tokenScope,
				account: account
			}
	
			instance
				.acquireTokenSilent(accessTokenRequest)
				.then((response) => {
					const config = {
						headers: {
							'Authorization': 'Bearer ' + response.accessToken
						}
					}
	
					axiosClient()
						.post('oauth/azure', { username: account.username } ,config)
						.then((response) => {
							setSession(account.username, response.data);
							res(response);
						})
						.catch(ex => rej(ex));
				})
				.catch(ex => rej(ex));
		})
	}

	const setSession = (username, data) => {
		storage.setSession('userName', username);
		storage.setSession('accessToken', data.access_token);
		storage.setSession('refreshToken', data.refresh_token);
		storage.setSession('fullName', data.user.fullName);
		
		if (data.user?.permissions) {
			storage.setSession('permissions', data.user?.permissions);
			const permissions = JSON.parse(data.user?.permissions);
			setPermissions(permissions);
		}

		storage.setSession('profile', data.user.profile);
		setProfile(data.user.profile);
	}

	const error = (error) => {
		swal({
			title: 'Error',
			icon: 'error',
			text: 'Somthing goes wrong!'
		});
	}

	const logOut = () => {
		if (isAuthenticated) {
			instance
				.logoutPopup()
				.then(() => push('/logout'))
		}
		else {
			push('/logout');
		}
	}

	const clear = () => {
		storage.clearSession();
		setProfile(null);
		setPermissions(null);
		setClientId(null);
		push('/');
	}

	return {
		ccmsLogin,
		mfaLogin,
		logOut,
		isExist,
		clear
	}
}