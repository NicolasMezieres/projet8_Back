import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: process.env.MAILER_SECURE === 'false',
      auth: {
        user: this.config.get('SMTP_EMAIL'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }
  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.config.get('SERVER_URL')}/activate/${token}`;
    const emailHTML = `<p>Hey ${user.firstname} ${user.lastname},</p>
        <p>Your requested an account creation on Pochtron & Sofa
             click <a href='${url}'>here</a> to activate your account
        </p>
        <p>If you did not request this email you can safely ignot it.</p>`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: 'Welcome user! Confirm your Email',
      html: emailHTML,
    });
  }
}
