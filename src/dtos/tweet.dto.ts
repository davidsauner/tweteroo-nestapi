import { IsNotEmpty, IsString } from "class-validator"

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty({ message: "todos os campos são necessários"})
    username: string

    @IsString()
    @IsNotEmpty({ message: " Todos os campos são necessários"})
    tweets: string;

}