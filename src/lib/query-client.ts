import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

function handleUnAuthorized(error: any) {
	console.log(error)
	// if (window.location.pathname.split('/')[1] === 'share') return;
	// If (isServerError(error, 'ErrWrongAuthHeader')) {
	//   location.href = '/login';
	//   console.log('redirect to login');
	//   // !!! có thể có loop ở đây vì nếu chuyển hướng vô /login mà cookie ko đc set thì sẽ lại chuyển hướng vô /login lần nữa
	// }
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: process.env.NODE_ENV !== "development",
		},
	},
	queryCache: new QueryCache({
		onError(error) {
			handleUnAuthorized(error)
		},
	}),
	mutationCache: new MutationCache({
		onError(error) {
			handleUnAuthorized(error)
		},
	}),
})
