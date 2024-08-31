import { TConnection } from "@/entities";
import { cn } from "@/shared";
import { Bolt } from "lucide-react";

type ColorOptionProps = {
  assetsPath: string;
  active?: boolean;
  setConnection: (conn: TConnection) => void;
  connection: TConnection;
};

export function ConnectionOption(props: ColorOptionProps) {
  const { active, setConnection, connection, assetsPath } = props;

  return (
    <div
      key={connection?.slug}
      onClick={() => {
        setConnection(connection);
      }}
      className={cn(
        "flex flex-row justify-start p-1 rounded-lg gap-2 items-center flex-grow cursor-pointer hover:opacity-70",
        {
          "ring-4": active,
        },
      )}
    >
      <div className="flex justify-start items-center ">
        <Bolt strokeWidth={1} className="w-12 h-12" absoluteStrokeWidth />
      </div>
      <div className="flex flex-col gap-1 justify-start tracking-tight leading-3 text-xs">
        <div className="text-left">{connection.fullName}</div>
        {connection.priceConst > 0 ? (
          <div className="text-muted-foreground text-left">+ {connection.priceConst} руб.</div>
        ) : (
          <div className="text-muted-foreground text-left">без наценки</div>
        )}
      </div>
    </div>
  );
}
