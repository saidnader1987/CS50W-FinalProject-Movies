import { Actor } from './actor';
import { Director } from './director';
import { Genre } from './genres';
import { Platform } from './platform';
import { Review } from './review';
import { YoutubeTrailer } from './youtubeTrailer';

export class MovieDetail {
  constructor(
    public id: string,
    public title: string,
    public poster: string,
    public duration: number,
    public country: string,
    public releaseDate: string,
    public popularity: number,
    public director: Director,
    public actors: Actor[],
    public genre: Genre,
    public platforms: Platform[],
    public reviews: Review[],
    public youtubeTrailer: YoutubeTrailer
  ) {}
}
