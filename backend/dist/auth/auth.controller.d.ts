import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    } | {
        message: string;
    }>;
    register(body: {
        username: string;
        password: string;
        role?: string;
    }): Promise<import("../users/user.entity").User>;
    me(req: any): Promise<any>;
}
