import { Login } from "components/login";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Template } from "templates/template";
import { Store } from "./provider";
import { routes } from "utilities/routes";
import { PrimaryRole } from "config";
import { Unauthorized } from "components/unauthorized";

export const ProtectedRoutesProvider = ({ children }) => {
	const [isPublic, setIsPublic] = useState(false);
	const [isAuthorize, setIsAuthorize] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const [hasTemplate, setHasTemplate] = useState(true);
	const [title, setTitle] = useState('');

	const { profile, permissions } = useContext(Store);
	const { pathname } = useRouter();

	// check is route is public
	useEffect(() => {
		setIsPublic(routes.public.filter((route) => route.path === pathname).length > 0);
	}, [pathname]);

	// check if is authorize
	useEffect(() => {
		setIsAuthorize(false);
		setIsLogged(false);

		if (profile === PrimaryRole) setIsAuthorize(true);
		else {
			let authorizeRoutes = [];
			Object.keys(routes.authorized).forEach(key => authorizeRoutes.push(...routes.authorized[key]) );
	
			if (profile) {
				setIsLogged(true);
				const authorizeRoute = authorizeRoutes.filter(route => route.path === pathname)
				if (authorizeRoute.length > 0) {
					setIsAuthorize(true);
					authorizeRoute[0].template === false ? setHasTemplate(false) : setHasTemplate(true);
				}
				else {
					permissions.forEach(section => {
						const currentRoute = routes.hasOwnProperty(section.toLowerCase()) && routes[section.toLowerCase()].filter(route => route.path === pathname);
						if (currentRoute.length > 0) {
							setIsAuthorize(true);
							setTitle(currentRoute[0].text);
						}
					})
				}
			}
		}		
	}, [profile, pathname]);


	return (
		<>
			{
				isPublic ? 
					children
				:	
					isAuthorize ?
						hasTemplate ?
							<Template title={title}>
								{ children }
							</Template>
							:
							children
						:
						isLogged ? 
							<Unauthorized />
						:
							<Login />
			}
		</>
	);
}