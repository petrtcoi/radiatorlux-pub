import mongoose, { Document, model, Schema } from "mongoose";
import { ColConnGroups, TColConnGroup } from "./_general";

type TColor = Document & {
  group: string;
  type: TColConnGroup;
  any?: boolean;

  slug: string;
  order?: number;
  code: string;
  name: string;
  fullName: string;
  image?: string;
  hex?: string;
  priceRate: number;
  priceConst: number;
  priceCode: string;
};

const ColorSchema = new Schema<TColor>({
  group: { type: String, required: true },
  type: { type: String, enum: ColConnGroups, required: true },
  any: { type: Boolean },

  slug: { type: String, unique: true, required: true },
  order: { type: Number, required: false },
  code: { type: String, required: true },
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  image: { type: String },
  hex: { type: String },
  priceRate: { type: Number, required: true },
  priceConst: { type: Number, required: true },
  priceCode: { type: String, required: true },
});

const Color = mongoose.models?.Color || model("Color", ColorSchema);

export { Color };
export type { TColor };
