export class User {
    id: number;
    email: string;
    status: string;
    firstName: string;
    lastName: string;
    description: string;
    link: string;
    role: Role;
}

export class UserRegister {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: Role;
}

export class Role {
    name: string
}
