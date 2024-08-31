import googleSheetParse from './googleSheetParse'

export const googleSheetGetData = async (
	csvDocId: string
): Promise<{ [key: string]: string }[]> => {
	try {
		const csvLink = `https://docs.google.com/spreadsheets/d/${csvDocId}/export?format=csv`
		const response = await fetch(csvLink)

		if (!response.ok) {
			throw new Error(`Failed to fetch the CSV file: ${response.statusText}`)
		}
		const csvData = await response.text()
		const data = googleSheetParse(csvData)
		return data

		// ---
	} catch (error: unknown) {
		console.error('Error reading Google Sheet:', (error as Error).message)
		return []
	}
}
