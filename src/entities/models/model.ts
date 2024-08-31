import mongoose, { Document, model, Schema } from "mongoose";

export const ModelTypesMap = {
  Vertical: "vertical",
  Horizontal: "horizontal",
  Floor: "floor",
  WithoutFan: "without-fan",
  WithFan: "with-fan",
} as const;

export const ModelTypes = Object.values(ModelTypesMap);
export type ModelType = (typeof ModelTypes)[number];

// ----------------

type TModel = { _id: string } & {
  slug: string;
  order?: number;
  bestseller?: boolean;
  name: string;
  fullName: string;
  shortDesc: string;

  colHeightHight?: boolean;
  colHeightMedium?: boolean;
  colHeightLow?: boolean;

  interAxis: number;

  images: string;
  schemas: string;

  type: ModelType[];
  convType?: string;
  lineSlug: string;
  assetsPath: string;

  similarSlugs?: string;
  seeAlsoSlugs?: string;

  statsRadiatorsCount?: number;
  statsPriceMin?: number;
  statsPriceMax?: number;
  statsDt70Min?: number;
  statsDt70Max?: number;
  statsHeightMin?: number;
  statsHeightMax?: number;
  statsLengthMin?: number;
  statsLengthMax?: number;
  statsSectionsMin?: number;
  statsSectionsMax?: number;
};

const ModelSchema = new Schema<TModel>({
  slug: { type: String, unique: true, required: true },
  order: { type: Number, required: false, index: true },
  bestseller: { type: Boolean, index: true, required: false },
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  shortDesc: { type: String, required: true },

  colHeightHight: { type: Boolean, required: false },
  colHeightMedium: { type: Boolean, required: false },
  colHeightLow: { type: Boolean, required: false },

  interAxis: { type: Number },

  images: { type: String, required: false },
  schemas: { type: String, required: false },

  type: [{ type: String, enum: ModelTypes, required: true }],
  lineSlug: { type: String, required: false },
  assetsPath: { type: String, required: true },
  convType: { type: String, required: false },

  similarSlugs: { type: String, required: false },
  seeAlsoSlugs: { type: String, required: false },

  statsRadiatorsCount: { type: Number, required: false },
  statsPriceMin: { type: Number, required: false },
  statsPriceMax: { type: Number, required: false },
  statsDt70Min: { type: Number, required: false },
  statsDt70Max: { type: Number, required: false },
  statsHeightMin: { type: Number, required: false },
  statsHeightMax: { type: Number, required: false },
  statsLengthMin: { type: Number, required: false },
  statsLengthMax: { type: Number, required: false },
  statsSectionsMin: { type: Number, required: false },
  statsSectionsMax: { type: Number, required: false },
});

const Model = mongoose.models?.Model || model("Model", ModelSchema);

export { Model };
export type { TModel };
