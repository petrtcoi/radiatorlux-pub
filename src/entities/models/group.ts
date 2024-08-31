import mongoose, { Document, model, Schema } from 'mongoose'

export const GroupSlugsMap = {
	columns: 'columns',
	design: 'design',
	convectors: 'convectors',
} as const

export const GroupSlugs = Object.values(GroupSlugsMap)
export type GroupSlug = (typeof GroupSlugs)[number]

type TGroup = Document & {
	slug: GroupSlug
	order?: number
	name: string
	fullName: string
	aboutTitle: string
	shortDesc: string
	images: string
	assetsPath: string
}

const GroupSchema = new Schema<TGroup>({
	slug: { type: String, enum: GroupSlugs, required: true },
	order: { type: Number, required: false },
	name: { type: String, required: true },
	fullName: { type: String, required: true },
	aboutTitle: { type: String, required: true },
	shortDesc: { type: String, required: true },
	images: { type: String, required: false },
	assetsPath: { type: String, required: true },
})

const Group = mongoose.models?.Group || model('Group', GroupSchema)

export { Group }
export type { TGroup }
