"use client";

import MenuBar from "../components/MenuBar";
import Sidebar from "../components/SideBar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login");
		}
	}, [user, loading, router]);

	if (loading) {
		return <div className="flex h-screen justify-center items-center mx-auto">
			<p>Loading...</p>
			</div>;
	}
	if (!user) {
		return null;
	}
	return <div className="flex">
    <Sidebar />
    {children}
    </div>;
}
