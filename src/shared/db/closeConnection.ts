export function closeConnection() {
	const cached = global.mongoose
	if (cached.conn) {
		cached.conn.connection.close()
		cached.conn = null
	}
	return
}
