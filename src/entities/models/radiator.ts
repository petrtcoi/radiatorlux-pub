import mongoose, { model, Schema } from "mongoose";

// ----------------

type TRadiator = {
  slug: string;
  order?: number;
  name: string;
  fullName: string;

  width: number;
  height: number;
  length: number;
  sections?: number;
  interAxial?: number;

  dt50?: number;
  dt60?: number;
  dt70: number;
  dt80?: number;

  weight?: number;
  volume?: number;

  priceRub: number;
  modelSlug: string;
  assetsPath: string;
};

const RadiatorSchema = new Schema<TRadiator & Document>({
  slug: { type: String, unique: true, required: true },
  order: { type: Number, required: false, index: true },
  name: { type: String, required: true },
  fullName: { type: String, required: true },

  width: { type: Number, required: true },
  height: { type: Number, required: true },
  length: { type: Number, required: true },
  sections: { type: Number },

  dt50: { type: Number },
  dt60: { type: Number },
  dt70: { type: Number, required: true },
  dt80: { type: Number },

  weight: { type: Number },
  volume: { type: Number },

  priceRub: { type: Number, required: true },
  modelSlug: { type: String, required: true, index: true },
  assetsPath: { type: String, required: true },
});

const Radiator = mongoose.models?.Radiator || model("Radiator", RadiatorSchema);

export { Radiator };
export type { TRadiator };
