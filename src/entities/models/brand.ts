import mongoose, { Document, model, Schema } from "mongoose";

type TBrand = Document & {
  slug: string;
  order?: number;
  name: string;
  metaTitle: string;
  metaDescription: string;
  logo: string;
};

const BrandSchema = new Schema<TBrand>({
  slug: { type: String, unique: true, required: true },
  order: { type: Number, required: false },
  name: { type: String, required: true },
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  logo: { type: String, required: true },
});

const Brand = mongoose.models?.Brand || model("Brand", BrandSchema);

export { Brand };
export type { TBrand };
