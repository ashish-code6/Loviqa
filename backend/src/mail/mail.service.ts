import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  async sendPasswordResetEmail(email: string, resetUrl: string) {
    const smtpUser =
      this.configService.get<string>('SMTP_USER') ??
      this.configService.get<string>('EMAIL_USER');
    const smtpPass =
      this.configService.get<string>('SMTP_PASS') ??
      this.configService.get<string>('EMAIL_PASS');
    const host =
      this.configService.get<string>('SMTP_HOST') ??
      (smtpUser ? 'smtp.gmail.com' : undefined);
    const from = this.configService.get<string>('SMTP_FROM') ?? smtpUser;

    if (!host || !from || !smtpUser || !smtpPass) {
      throw new InternalServerErrorException('Email delivery is not configured.');
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(this.configService.get<string>('SMTP_PORT') ?? 587),
      secure: this.configService.get<string>('SMTP_SECURE') === 'true',
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from,
      to: email,
      subject: 'Reset your Loviqa password',
      text: `We received a request to reset your Loviqa password. Use this link within 15 minutes: ${resetUrl}`,
      html: `<p>We received a request to reset your Loviqa password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 15 minutes. If you did not request it, you can ignore this email.</p>`,
    });
  }
}
