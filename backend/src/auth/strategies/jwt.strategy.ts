import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

export interface JwtPayload {
  sub: number
  email: string
  perfilId: number
  rol: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET', 'sep_jwt_secret_2024'),
    })
  }

  validate(payload: JwtPayload) {
    return {
      usuarioId: payload.sub,
      email: payload.email,
      perfilId: payload.perfilId,
      rol: payload.rol,
    }
  }
}
