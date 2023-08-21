import { Tweet } from './entities/tweet.entity';
import { Injectable, Body, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }
  private users:User[] = [];
  private tweets:Tweet[] = []

  createUser(body: CreateUserDto){
    const user = new User(body.username,body.avatar);
    return this.users.push(user);
  }


  PostTweet(body: CreateTweetDto){
    const user = this.users.find(user => user.username === body.username);
    if(!user){
      throw new UnauthorizedException()
    }
    const tweet =  new Tweet(user, body.tweet);
    return this.tweets.push(tweet);
  
  }

  




}

