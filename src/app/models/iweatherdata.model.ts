import { IcurrentConditionModel } from "./icurrent-condition.model";

export interface IweatherdataModel {

    city_info: Map<string, string>;
    forecast_info: Map<string, string>;
    current_condition: IcurrentConditionModel;      // modelisé, utilisable
    fcst_day_0: Array<Map<string, string>>;
    fcst_day_1: Array<Map<string, string>>;
    fcst_day_2: Array<Map<string, string>>;
    fcst_day_3: Array<Map<string, string>>;
    fcst_day_4: Array<Map<string, string>>;
}
