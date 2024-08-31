import { Brand, Line, Model, Radiator, TRadiator } from "@/entities";
import { connectToDb } from "@/shared";
import { googleSheetGetData, wait } from "./../_utils";

/**====================
 * Constants
 ======================*/

const EnvSecret = process.env.SERVICES_SECRET;

const sheetId = process.env.TUBOG_GOOGLE_SHEET_ID;
const brandSlug = "rifar";
const lineSlug = "tubog";
const MinSections = 4;

/**====================
 * Main Function
 ======================*/

export const POST = async (req: Request) => {
  const { secret } = await req.json();
  if (secret !== EnvSecret) {
    await wait(5 * 1000);
    return Response.json({ finished: true });
  }

  await connectToDb();
  if (!sheetId) return Response.json({ error: "No sheet id" });

  // ---- Prepare data ----

  const brand = await Brand.findOne({ slug: brandSlug });
  if (!brand) return Response.json({ error: "No brand" });

  const tubogLine = await Line.findOne({ slug: lineSlug });
  if (!tubogLine) return Response.json({ error: "No line" });

  const models = await Model.find({ lineSlug: tubogLine.slug });

  const data = await googleSheetGetData(sheetId);

  // ---- Create radiators ----

  for (const row of data) {
    const maxSections = Number(row.sectionsMax);
    if (maxSections < MinSections) continue;

    const sections = Array.from(
      { length: maxSections - MinSections + 1 },
      (_, i) => i + MinSections,
    );

    const modelSlug = `tubog-${row.code}`;
    const model = models.find(m => m.slug === modelSlug);
    if (!model) {
      console.error("No model", modelSlug);
      continue;
    }

    // --- work per section ----

    for (const section of sections) {
      const sectionsStr = section > 9 ? section.toString() : `0${section}`;

      const radiator: TRadiator = {
        slug: `${modelSlug}-${section}`,
        order: section,
        name: `${row.name}-${sectionsStr}`,
        fullName: `${row.name} ${sectionsStr} секц.`,
        width: Number(row.width),
        height: Number(row.height),
        length: Number(row.lengthSection) * section + Number(row.lengthBase),
        sections: section,

        dt50: Number(row.dt50) * section,
        dt60: Number(row.dt60) * section,
        dt70: Number(row.dt70) * section,

        weight: Math.round(Number(row.weightSection) * section * 100) / 100,
        volume: Math.round(Number(row.volume) * section * 100) / 100,

        priceRub: Number(row.priceSection) * section,
        modelSlug: model.slug,
        assetsPath: `tubog`,
      };

      const rad = new Radiator(radiator);
      await rad.save();

      // const res = await Radiator.findOneAndUpdate(
      // 	{ slug: radiator.slug },
      // 	radiator,
      // 	{
      // 		upsert: true,
      // 	}
      // )
    }
  }

  return Response.json({ finished: true });
};
