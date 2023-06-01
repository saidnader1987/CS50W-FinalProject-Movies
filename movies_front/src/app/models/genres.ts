import { Movie } from './movie';

export class Genre {
  constructor(public id: string, public type: string, public movies: Movie[]) {}
}
