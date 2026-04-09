import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator'

export class RegistrarEmpresaDto {
  @ApiProperty({ example: 6, description: 'ID tipo documento (6=NIT)' })
  @IsNumber()
  tipoDocumentoIdentidadId: number

  @ApiProperty({ example: 900123456 })
  @IsNumber()
  empresaIdentificacion: number

  @ApiProperty({ example: 7, description: 'Dígito de verificación del NIT' })
  @IsNumber()
  @Min(0)
  empresaDigitoVerificacion: number

  @ApiProperty({ example: 'EMPRESA EJEMPLO S.A.S.' })
  @IsString()
  @IsNotEmpty()
  empresaRazonSocial: string

  @ApiProperty({ example: 'EE SAS' })
  @IsString()
  @IsNotEmpty()
  empresaSigla: string

  @ApiProperty({ example: 'empresa@ejemplo.com' })
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
