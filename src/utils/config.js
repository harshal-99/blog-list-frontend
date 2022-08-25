export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

if (!BACKEND_URL) {
	throw new Error('REACT_APP_BACKEND_URL must be set')
}
