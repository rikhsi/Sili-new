import { DASHBOARD_ROUTE } from "../constants";
import { NZ_ICONS_TYPE } from "./icons.type";

export type DashboardMenuItem = {
    title: string;
    icon: NZ_ICONS_TYPE;
    route: DASHBOARD_ROUTE;
    disabled?: boolean;
    selected?: boolean;
    danger?: boolean;
}