import { Controller, Get, Param, Query, ParseIntPipe, Res, BadRequestException } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import type { Response } from 'express'
import { CertificadosService } from './certificados.service'

@ApiTags('certificados')
@Controller('certificados')
export class CertificadosController {
  constructor(private readonly svc: CertificadosService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar certificados por persona o código' })
  @ApiQuery({ name: 'tipoDocumento', required: false })
  @ApiQuery({ name: 'numero',        required: false })
  @ApiQuery({ name: 'codigo',        required: false })
  buscar(
    @Query('tipoDocumento') tipoDocumento?: string,
    @Query('numero')        numero?: string,
    @Query('codigo')        codigo?: string,
  ) {
    if (codigo) return this.svc.buscarPorCodigo(codigo)
    if (tipoDocumento && numero) return this.svc.buscarPorPersona(tipoDocumento, numero)
    throw new BadRequestException('Proporcione tipoDocumento+numero o codigo')
  }

  @Get(':id/pdf')
  @ApiOperation({ summary: 'Descargar certificado como PDF' })
  async pdf(
    @Param('id', ParseIntPipe) afGrupoBeneficiarioId: number,
    @Query('personaId', ParseIntPipe) personaId: number,
    @Res() res: Response,
  ) {
    const buf = await this.svc.generarPdf(afGrupoBeneficiarioId, personaId)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="certificado_${afGrupoBeneficiarioId}.pdf"`,
      'Content-Length': buf.length,
    })
    res.end(buf)
  }
}