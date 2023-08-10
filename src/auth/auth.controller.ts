import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AuthServiceClient,
  RegisterResponse,
  RegisterRequest,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
} from '../pb/auth.pb';
import { Request } from 'express';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.register(body);
  }

  @Put('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return this.svc.login(body);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  private async getProfile(
    @Req() req: Request,
  ): Promise<Observable<ProfileResponse>> {
    const userId = <number>req.user;
    return this.svc.profile({ userId });
  }
}
