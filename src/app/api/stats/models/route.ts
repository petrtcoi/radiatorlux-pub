import { Brand, Line, Model, Radiator, TRadiator } from "@/entities";
import { connectToDb, Stats } from "@/shared";

/**====================
 * Constants
 ======================*/

const EnvSecret = process.env.SERVICES_SECRET;

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
  const models = await Model.find();

  for (const model of models) {
    const radiators = (await Radiator.find({ modelSlug: model.slug }).lean()) as TRadiator[];

    const prices = radiators.map(radiator => radiator.priceRub);
    const dt70s = radiators.map(radiator => radiator.dt70);
    const heights = radiators.map(radiator => radiator.height);
    const lengths = radiators.map(radiator => radiator.length);
    const sections = radiators.map(radiator => radiator?.sections).filter(Boolean) as number[];

    await Model.updateOne(
      { _id: model._id },
      {
        statsRadiatorsCount: radiators.length,
        statsPriceMin: Math.min(...prices),
        statsPriceMax: Math.max(...prices),
        statsDt70Min: Math.min(...dt70s),
        statsDt70Max: Math.max(...dt70s),
        statsHeightMin: Math.min(...heights),
        statsHeightMax: Math.max(...heights),
        statsLengthMin: Math.min(...lengths),
        statsLengthMax: Math.max(...lengths),
        statsSectionsMin: sections.length > 0 ? Math.min(...sections) : undefined,
        statsSectionsMax: sections.length > 0 ? Math.max(...sections) : undefined,
      },
    ).exec();
  }

  return Response.json({ finished: true });
};
