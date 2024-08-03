import React from "react";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

type Props = {
	children: React.ReactNode;
};

const ProtectedRoute = (props: Props) => {
	const { user, loading } = useAuth();
	const router = useRouter();

	if (loading) {
		return <div>Verifying session, please wait...</div>;
	}

	if (!user) {
		router.push("/login");
		return null;
	}

	return <>{props.children}</>;
};

export default ProtectedRoute;
