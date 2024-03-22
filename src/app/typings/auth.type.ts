import { FormControl } from "@angular/forms"

export type AuthLoginForm = {
    login: FormControl<string>;
    password: FormControl<string>;
}