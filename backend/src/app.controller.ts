import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // 1. Importujeme službu

@Controller('auth')
export class AppController {
  constructor(private jwtService: JwtService) {} // 2. "Vstrekneme" službu do controllera

  @Post('login')
  async login(@Body() loginData: any) {
    if (loginData.email === 'admin@test.sk' && loginData.password === 'heslo123') {
      // 3. VYTVORÍME TOKEN
      const payload = { email: loginData.email, sub: 'user-id-123' };
      const token = this.jwtService.sign(payload);

      return { 
        success: true, 
        access_token: token // Posielame token frontend-u
      };
    }
    
    return { success: false, message: 'Nesprávne údaje.' };
  }
}