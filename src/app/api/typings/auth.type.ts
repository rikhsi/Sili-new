import { AuthLoginForm, FormValue } from "src/app/typings";

export type AuthLoginData = FormValue<AuthLoginForm>;

export interface IAuthLoginResponse {
    token: string;
}