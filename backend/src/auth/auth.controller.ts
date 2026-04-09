import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegistrarEmpresaDto } from './dto/registrar-empresa.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { CurrentUser } from './decorators/current-user.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión en el SEP' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Post('registrar-empresa')
  @ApiOperation({ summary: 'Registro público de empresa/gremio/asociación' })
  registrarEmpresa(@Body() dto: RegistrarEmpresaDto) {
    return this.authService.registrarEmpresa(dto)
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  perfil(@CurrentUser() user: { usuarioId: number }) {
    return this.authService.perfil(user.usuarioId)
  }
}
