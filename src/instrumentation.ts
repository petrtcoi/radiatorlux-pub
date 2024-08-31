import { connectToDb } from './shared'

export async function register() {
	await connectToDb()
}
