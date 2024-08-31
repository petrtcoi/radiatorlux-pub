import * as csv from 'csv-string'

const googleSheetParse = (data: string) => {
	const [csvHeaders, ...csvData] = csv.parse(data)
	const results = csvData.map(row => {
		const res: { [key: string]: any } = {}
		csvHeaders.forEach((key, index) => {
			res[key] = row[index]
		})
		return res
	})
	return results
}

export default googleSheetParse
