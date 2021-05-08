import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const signup = (email, password, name = "Dima") => {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				result.user.updateProfile({
					displayName: name,
					photoURL: Math.floor(Math.random() * 5) + 1,
				});
			});
	};

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	const logout = () => {
		return auth.signOut();
	};

	useEffect(() => {
		const listener = auth.onAuthStateChanged((user) => {
			let updatedUser = null;
			if (user) {
				updatedUser = {
					name: user.displayName,
					email: user.email,
					emailVerified: user.emailVerified,
					photoURL: user.photoURL,
					uid: user.uid,
				};
				localStorage.setItem(
					"authUser",
					JSON.stringify({
						name: updatedUser.name,
						email: updatedUser.email,
					})
				);
			} else {
				localStorage.removeItem("authUser");
			}
			setIsLoading(false);
			setCurrentUser(updatedUser);
		});

		return () => listener();
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
}
