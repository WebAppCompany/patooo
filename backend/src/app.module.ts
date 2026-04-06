import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // 1. Importujeme JWT modul
import { AppController } from './app.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'MOJE_TAJNE_HESLO_123', // Toto by malo byť v reále v .env súbore
      signOptions: { expiresIn: '1h' }, // Token vyprší o hodinu
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}