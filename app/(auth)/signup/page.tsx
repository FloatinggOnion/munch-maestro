"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
	getAuth,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithRedirect,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { Nunito } from "next/font/google";
import { Button, Stack, Typography, Link as JoyLink, Divider } from "@mui/joy";
import GoogleIcon from "@/app/components/GoogleIcon";
import { useRouter } from "next/navigation";

import { auth, provider } from "@/lib/firebase";
import { font } from "@/lib/font";

interface Error {
	code: string;
	message: string;
}

type Props = {};

const Page = (props: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [error, setError] = useState<Error>();
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleSignUp = () => {
		setIsLoading(true);

		if (password !== password2) {
			alert("Passwords do not match");
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;
					// ...
					setIsLoading(false);
					router.push("/");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					setError({ code: errorCode, message: errorMessage });
					setIsLoading(false);
				});
		}
	};

	return (
		<div className="flex flex-col p-6 justify-center lg:justify-between h-screen md:w-[75%] lg:h-[85vh] gap-8 lg:w-[45vw] mx-auto my-auto">
			<div>
                <h2 className="text-center text-xl">Sign up for</h2>
                <h1
                    className={`text-center text-4xl font-extrabold tracking-widest ${font.className}`}
                >
                    MunchMaestro
                </h1>
            </div>
			{/* When you uncomment this, change the lg:h-[75vh] to lg:h-full for the entire container */}
			{/* <Stack gap={4} sx={{ mb: 0 }}>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
				className="h-12"
				onClick={() => signInWithRedirect(auth, provider)}
              >
                Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                },
              })}
            >
              or
            </Divider> */}
			<div className="flex flex-col gap-4">
				<div>
					<label htmlFor="email" className="text-lg">
						E-mail
					</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border-2 border-neutral-700 rounded-xl h-14 w-full p-2"
						placeholder="Enter your email"
					/>
				</div>
				<div>
					<label htmlFor="password" className="text-lg">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border-2 border-neutral-700 rounded-xl h-14 w-full p-2"
						placeholder="Enter your password"
					/>
				</div>
				<div>
					<label htmlFor="password2" className="text-lg">
						Password again
					</label>
					<input
						id="password2"
						type="password"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
						className="border-2 border-neutral-700 rounded-xl h-14 w-full p-2"
						placeholder="Enter your password"
					/>
				</div>
				<Button
					onClick={handleSignUp}
					className="px-4 py-2 text-white font-semibold bg-slate-800 w-[50%] rounded-md border-2 hover:border-slate-800 hover:bg-white hover:text-slate-800 hover:font-semibold transition-all duration-150"
					loading={isLoading}
					variant="outlined"
					color="neutral"
				>
					Sign Up
				</Button>
				<p>
					Have an account?{" "}
					<Link
						href={"/login"}
						className="font-semibold underline underline-offset-2"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Page;
