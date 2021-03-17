import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "src/config/constants";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "../interface/JwtPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private userService: UsersService,
        private config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>(JWT_SECRET),
        });
    }

    async validate(payload: JwtPayload) {
        const { email: email, sub: id } = payload;
        return await this.userService.getOne(id);
    }
}