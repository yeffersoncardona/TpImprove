import { useAuth } from "hooks/useAuth"
import { useEffect } from "react";

export default () => {
	const { clear } = useAuth();

	useEffect(() => {
		clear();
	}, [])
}