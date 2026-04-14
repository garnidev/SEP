import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class RegistrarPersonaDto {
  @ApiProperty({ example: 1, description: 'ID tipo documento (1=CC, 2=CE, 3=Pasaporte)' })
  @IsNumber()
  tipoDocumentoIdentidadId: number

  @ApiProperty({ example: 1234567890 })
  @IsNumber()
  personaIdentificacion: number

  @ApiProperty({ example: 'Juan Carlos' })
  @IsString()
  @IsNotEmpty()
  personaNombres: string

  @ApiProperty({ example: 'Gómez' })
  @IsString()
  @IsNotEmpty()
  personaPrimerApellido: string

  @ApiPropertyOptional({ example: 'Martínez' })
  @IsString()
  @IsOptional()
  personaSegundoApellido?: string

  @ApiProperty({ example: 'juan@ejemplo.com' })
  @IsEmail()
  usuarioEmail: string

  @ApiProperty({ example: 'Clave2024*' })
  @IsString()
  @IsNotEmpty()
  usuarioClave: string

  @ApiProperty({ example: true })
  @IsBoolean()
  habeasData: boolean
}
