import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({ example: 'admin@sena.edu.co' })
  @IsEmail({}, { message: 'Correo electrónico inválido' })
  email: string

  @ApiProperty({ example: '••••••••' })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  clave: string
}
