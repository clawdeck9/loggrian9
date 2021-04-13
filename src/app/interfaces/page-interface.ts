import { LogInterface } from "./log-interface";

export interface PageInterface {
    content: LogInterface[];
    empty: boolean;
    first: boolean;
    last: boolean;
}
