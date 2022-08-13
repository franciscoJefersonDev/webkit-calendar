import { writable } from 'svelte/store';
// import { getAnalytics } from 'firebase/analytics';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
export const firebaseConfig = {
	apiKey: 'AIzaSyAodc3EHPvnONlgkqF8PzUJ7qL2DunTlNQ',
	authDomain: 'web-kit.firebaseapp.com',
	projectId: 'web-kit',
	storageBucket: 'web-kit.appspot.com',
	messagingSenderId: '930768219517',
	appId: '1:930768219517:web:a1648ac786d627326df014',
	measurementId: 'G-E3YEM13RTZ'
};
export const app = initializeApp(firebaseConfig);
export let auth = writable(getAuth());
export const history = writable([]);
