import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('follow')
export class FollowController {

    constructor(private readonly followService: FollowService) { }

    @Post(':userId')
    @UseGuards(JwtAuthGuard)
    follow(@Param('userId') userId: string, @Req() req) {
        return this.followService.follow(req.user.id, userId);
    }


}
