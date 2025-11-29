import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("../users/users.entity").User>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    me(): {
        message: string;
    };
}
