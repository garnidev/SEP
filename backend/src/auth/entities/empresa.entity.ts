import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('EMPRESA')
export class Empresa {
  @PrimaryColumn({ name: 'EMPRESAID', type: 'number' })
  empresaId: number

  @Column({ name: 'TIPODOCUMENTOIDENTIDADID', type: 'number' })
  tipoDocumentoIdentidadId: number

  @Column({ name: 'EMPRESAIDENTIFICACION', type: 'number' })
  empresaIdentificacion: number

  @Column({ name: 'EMPRESADIGITOVERIFICACION', type: 'number', default: 0 })
  empresaDigitoVerificacion: number

  @Column({ name: 'EMPRESARAZONSOCIAL', type: 'nchar', length: 300 })
  empresaRazonSocial: string

  @Column({ name: 'EMPRESASIGLA', type: 'nchar', length: 100 })
  empresaSigla: string

  @Column({ name: 'EMPRESAEMAIL', length: 200, nullable: true })
  empresaEmail: string

  @Column({ name: 'EMPRESAFECHAREGISTRO', type: 'date' })
  empresaFechaRegistro: Date

  @Column({ name: 'COBERTURAEMPRESAID', type: 'number', nullable: true })
  coberturaEmpresaId: number

  @Column({ name: 'DEPARTAMENTOEMPRESAID', type: 'number', nullable: true })
  departamentoEmpresaId: number

  @Column({ name: 'CIUDADEMPRESAID', type: 'number', nullable: true })
  ciudadEmpresaId: number

  @Column({ name: 'CIIUID', type: 'number', nullable: true })
  ciiuId: number

  @Column({ name: 'TIPOEMPRESAID', type: 'number', nullable: true })
  tipoEmpresaId: number

  @Column({ name: 'TAMANOEMPRESAID', type: 'number', nullable: true })
  tamanoEmpresaId: number

  @Column({ name: 'SECTORID', type: 'number', nullable: true })
  sectorId: number

  @Column({ name: 'SUBSECTORID', type: 'number', nullable: true })
  subSectorId: number

  @Column({ name: 'TIPOIDENTIFICACIONREP', type: 'number', nullable: true })
  tipoIdentificacionRep: number
}
