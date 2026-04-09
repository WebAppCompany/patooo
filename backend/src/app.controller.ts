import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('auth')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    
    // Simplistic auth for demonstration
    // If user doesn't exist, register them (so they can see something work immediately)
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          password // Never do plain text in production!
        }
      });
      return { message: 'Účet bol úspešne vytvorený!', user };
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Nesprávne heslo');
    }

    return { message: 'Prihlásenie úspešné!', user };
  }
}
