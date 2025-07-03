export interface UserAdminUpdateDto{
    name?:string;
    lastName?:string;
    dni?:string;
    email?:string;
    resetPassword?:string;
    isAdmin?:boolean;
}