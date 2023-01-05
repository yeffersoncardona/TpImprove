import { CustomSideBar } from 'components/template/customSideBar';
import { routes } from 'utilities/routes';
import { ProfileSideBar } from './profileSideBar';

export const SideBar = ({ open }) => {
	return (
		<>
			{/* Firs custom menu items */}
			<CustomSideBar open={open} items={routes.authorized.default} />

			{/* Profile menu items */}
			<ProfileSideBar open={open} />
		</>
	);
}