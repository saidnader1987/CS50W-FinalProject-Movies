import { Movie } from './movie';
import { Director } from './director';

export class DirectorDetail extends Director {
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
