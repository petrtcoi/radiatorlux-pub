import { Schema } from 'mongoose'

// ------

export type TFeature = {
	title: string
	value: string
}
export const FeatureSchema = new Schema<TFeature>({
	title: { type: String, required: true },
	value: { type: String, required: true },
})

// ----

export const ColConnGroupMap = {
	Default: 'default',
	Main: 'main',
	Rest: 'rest',
} as const

export const ColConnGroups = Object.values(ColConnGroupMap)
export type TColConnGroup = (typeof ColConnGroups)[number]
