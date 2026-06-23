import { IsString, Matches, MaxLength } from 'class-validator';

export class ScrapeProfileDto {
  @IsString()
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9._]+$/, {
    message: 'username must only contain letters, numbers, dots and underscores',
  })
  username: string;
}
