import { Country } from "../../country/models/country";

export interface SpeedWay {
    id: number,
    name: string,
    size: number,
    country: Country
}
