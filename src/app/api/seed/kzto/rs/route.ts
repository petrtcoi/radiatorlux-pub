import { Brand, Line, Model, Radiator, TRadiator } from '@/entities'
import { connectToDb } from '@/shared'
import { googleSheetGetData, wait } from '../../_utils'

/**====================
 * Constants
 ======================*/

const EnvSecret = process.env.SERVICES_SECRET

// KZTO RS
const sheetId = process.env.RS_GOOGLE_SHEET_ID
const lineSlug = 'rs'

const brandSlug = 'kzto'

/**====================
 * Main Function
 ======================*/

export const POST = async (req: Request) => {
	const { secret } = await req.json()
	if (secret !== EnvSecret) {
		await wait(5 * 1000)
		return Response.json({ finished: true })
	}

	await connectToDb()
	if (!sheetId) return Response.json({ error: 'No sheet id' })

	// ---- Prepare data ----

	const brand = await Brand.findOne({ slug: brandSlug })
	if (!brand) return Response.json({ error: 'No brand' })

	const line = await Line.findOne({ slug: lineSlug })
	if (!line) return Response.json({ error: 'No line' })

	const models = await Model.find({ lineSlug: line.slug })

	const data = await googleSheetGetData(sheetId)

	// ---- Create radiators ----

	for (const row of data) {
		const modelSlug = `${lineSlug}-${row.columns}-${row.interaxle}`
		const model = models.find(m => m.slug === modelSlug)
		if (!model) {
			console.error('No model', modelSlug)
			continue
		}

		// --- work per section ----

		const radiator: TRadiator = {
			slug: `${modelSlug}-${row.sections}`,
			order: Number(row.columns) * 100 + Number(row.sections),
			name: `КЗТО РС ${row.name}`,
			fullName: `КЗТО РС ${row.name} ${row.sections} секц.`,

			width: Number(row.depth),
			height: Number(row.height),
			length: Number(row.length),
			sections: Number(row.sections),

			dt60: Number(row.dt60),
			dt70: Number(row.dt70),

			weight: Number(row.weight),
			volume: Number(row.volume),

			priceRub: Number(row.price),
			modelSlug: model.slug,
			assetsPath: `rs`,
		}

		// const rad = new Radiator(radiator)
		// await rad.save()

		await Radiator.findOneAndUpdate({ slug: radiator.slug }, radiator, {
			upsert: true,
		})
	}

	return Response.json({ finished: true })
}
