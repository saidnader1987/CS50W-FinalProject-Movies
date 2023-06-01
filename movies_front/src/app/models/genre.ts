export class Genre {
  constructor(
    public id: string,
    public type: string,
    public movies: MovieGenre[]
  ) {}
}

export class MovieGenre {
  constructor(
    public country: string,
    public duration: number,
    public id: string,
    public popularity: number,
    public poster: string,
    public releaseDate: string,
    public title: string
  ) {}
}
