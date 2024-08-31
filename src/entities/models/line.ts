import mongoose, { Document, model, Schema } from "mongoose";
import { FeatureSchema, TFeature } from "./_general";

type TLine = Document & {
  slug: string;
  order?: number;
  name: string;
  fullName: string;
  aboutTitle: string;
  shortDesc: string;

  images: string;
  schemas: string;

  groupSlug: string;
  brandSlug: string;
  colorsGroup: string;
  connectionsGroup: string;

  features: TFeature[];
  similarSlugs: string[];
  defDiscount: number;

  assetsPath: string;
};

const LineSchema = new Schema<TLine>({
  slug: { type: String, unique: true, required: true },
  order: { type: Number, required: false },
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  aboutTitle: { type: String, required: true },

  shortDesc: { type: String, required: true },
  images: { type: String, required: false },
  schemas: { type: String, required: false },
  groupSlug: { type: String, required: false, index: true },
  brandSlug: { type: String, required: true },
  colorsGroup: { type: String, required: true },
  connectionsGroup: { type: String, required: true },
  features: [FeatureSchema],
  similarSlugs: [{ type: String, required: true }],
  defDiscount: { type: Number },
  assetsPath: { type: String, required: true },
});

const Line = mongoose.models?.Line || model("Line", LineSchema);

export { Line };
export type { TLine };
