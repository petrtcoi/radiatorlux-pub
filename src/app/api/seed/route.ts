import { googleSheetGetData } from './_utils'

const GOOGLE_DOC_ID_MODELS = '1K6PFmnsAklsE-8jORAIhffg8B542FNBjJNKJQ2pwomY'

export const POST = async () => {
	const data = await googleSheetGetData(GOOGLE_DOC_ID_MODELS)

	return Response.json({ data: data })
}
