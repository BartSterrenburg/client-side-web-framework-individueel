import {
    Controller,
    Request,
    Post,
    Get,
    UseGuards,
    Logger,
    Body,
    Param
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/decorators';
import {
    IUserCredentials,
    IUserIdentity,
    IUserRegistration
} from '@train-repo/shared/api';
import { CreateUserDto } from '@train-repo/backend/dto';
import { UserExistGuard } from '@train-repo/backend/user';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() credentials: IUserCredentials): Promise<IUserIdentity> {
        this.logger.log('Login');
        return await this.authService.login(credentials);
    }

    @Public()
    @UseGuards(UserExistGuard)
    @Post('register')
    async register(@Body() user: CreateUserDto): Promise<IUserIdentity> {
        this.logger.log('Register');
        return await this.authService.register(user);
    }

    @Get('check-email/:email')
    async checkIfEmailExists(@Param('email') email: string): Promise<boolean> {
        return await this.authService.checkIfEmailExists(email);
    }
}
