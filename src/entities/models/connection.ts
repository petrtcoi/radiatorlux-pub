import mongoose, { Document, model, Schema } from 'mongoose'
import { ColConnGroups, TColConnGroup } from './_general'

type TConnection = Document & {
	group: string
	type: TColConnGroup

	slug: string
	order?: number
	code: string
	name: string
	fullName: string
	image?: string
	priceRate: number
	priceConst: number
}

const ConnectionSchema = new Schema<TConnection>({
	group: { type: String, required: true },
	type: { type: String, enum: ColConnGroups, required: true },

	slug: { type: String, unique: true, required: true },
	order: { type: Number, required: false },
	code: { type: String, required: true },
	name: { type: String, required: true },
	fullName: { type: String, required: true },
	image: { type: String },
	priceRate: { type: Number, required: true },
	priceConst: { type: Number, required: true },
})

const Connection =
	mongoose.models?.Connection || model('Connection', ConnectionSchema)

export { Connection }
export type { TConnection }
