import Image from "next/image";
import { Eye } from "lucide-react";
import Card from "@/components/ui/Card";

export default function Visibility({ data }) {
  const { distance, unit, condition } = data;

  return (
    <Card title="Visibility">
      <div className="flex flex-1 items-center justify-center">
        <Image src="/icons/visibility.png" alt="" width={90} height={90} />
      </div>

      <div className="flex items-center justify-between">
        <p>
          <span className="text-xl font-medium">
            {String(distance).padStart(2, "0")}
          </span>{" "}
          <span className="text-sm">{unit}</span>
        </p>
        <p className="flex items-start gap-2 text-sm text-neutral-500">
          <Eye size={16} className="mt-1 shrink-0" />
          <span className="max-w-[150px]">{condition}</span>
        </p>
      </div>
    </Card>
  );
}