export interface Register{
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    role?:string
};

export interface Login{
    email:string,
    password:string
};

export interface ResetPassword{
    oldPassword:string,
    password:string,
    confirmPassword:string
};
