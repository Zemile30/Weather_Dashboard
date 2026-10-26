import Image from "next/image";
import { Droplets } from "lucide-react";
import Card from "@/components/ui/Card";

export default function Humidity({ data }) {
    const { value, dewPoint } = data;

    return (
        <Card title="Humidity">
            <div className="flex flex-1 items-center justify-center">
                <Image src="/icons/humidity.png" alt="" width={90} height={90} />
            </div>

            <div className="flex items-center justify-between">
                <p className="text-xl font-medium">{value}%</p>
                <p className="flex items-start gap-2 text-sm text-neutral-500">
                    <Droplets size={16} className="mt-0.5 shrink-0" />
                    <span className="max-w-[150px]">The dew point is {dewPoint}° right now</span>
                </p>
            </div>
        </Card>
    );
}