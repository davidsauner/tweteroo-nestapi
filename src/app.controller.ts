import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getHalth(): string {
    return this.appService.getHealth();
  }

  @Post("sign-up")
  @HttpCode(HttpStatus.OK)
  createUser(@Body()body:CreateUserDto){
    return this.appService.createUser(body)
  }
  

  @Post("tweets")
  @HttpCode(HttpStatus.CREATED)
  createTweet(@Body()body:CreateTweetDto){
    return this.appService.postTweet(body)
  }
    //  createtweet
  
  @Get("tweets")
  @HttpCode(HttpStatus.OK)
  getTweets(@Query("page") page: number | null){
    return this.appService.getTweets(page)

  }

  // @Get("tweets/:username")
  // @HttpCode(HttpStatus.OK)
  // // Getuserbyid

}
