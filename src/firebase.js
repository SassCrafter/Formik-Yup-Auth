import firebase from "firebase";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyCKF02kPo0moNR2-NHLLxMl4m0IXStx8GU",
	authDomain: "auth-2468d.firebaseapp.com",
	projectId: "auth-2468d",
	storageBucket: "auth-2468d.appspot.com",
	messagingSenderId: "107926406077",
	appId: "1:107926406077:web:a2383b30ef6ba027f4c8d4",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();

export default app;
