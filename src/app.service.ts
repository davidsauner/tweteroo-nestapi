import { Tweet } from './entities/tweet.entity';
import { Injectable, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';
import { last } from 'rxjs';
import { userInfo } from 'os';

@Injectable()
export class AppService {

  getHello(): string {
    return "I,m okay!";
  }

  

  private users:User[] = [];
  private tweets:Tweet[] = []

  createUser(body: CreateUserDto){
    const user = new User(body.username,body.avatar);
    return this.users.push(user);
  }


  postTweet(body: CreateTweetDto){
    const user = this.users.find(user => user.username === body.username);
    if(!user){
      throw new UnauthorizedException()
    }
    const tweet =  new Tweet(user, body.tweet);
    return this.tweets.push(tweet);
  
  }



  getTweets(page:number | null){
    if(page && page < 1){
      throw new BadRequestException('Informe uma página válida',
      {cause : new Error(),
      description:'Informe uma página válida'})
    }

    const lastTweets = this.tweets.reverse().map((tweet) => {
      return {
        username: tweet.user.username,
        avatar: tweet.user.avatar,
        tweet: tweet.tweet
      };
    });

    if(!page && lastTweets.length <= 15){
      return lastTweets;
    }
    if (!page && lastTweets.length > 15){
      return lastTweets.slice(0,15)

    }
    if (page && page >= 1) {

      const min = 15 * ( page - 1 );
      const max = (15 * page) -1
      const tweets = []

      for (let i = min; i <= max && i < lastTweets.length; i++){
        tweets.push(lastTweets[i])
      }

      return tweets;
    }
  }

  getTweetsByUser(username: string){

    const user = this.tweets.filter(t => t.user.username === username);
    if(user.length === 0){
      return [];
    }
    return user.map(t =>{
      return{
        username: t.user.username,
        avatar: t.user.avatar,
        tweet: t.tweet
      }
    })
  }

  

}

