import { Movie } from './movie';
import { Actor } from './actor';

export class ActorDetail extends Actor {
  public movies: Movie[] = [];
  constructor(
    id: string,
    name: string,
    photo: string,
    nationality: string,
    birthDate: Date,
    biography: string,
    movies: Movie[]
  ) {
    super(id, name, photo, nationality, birthDate, biography);
    this.movies = movies;
  }
}
