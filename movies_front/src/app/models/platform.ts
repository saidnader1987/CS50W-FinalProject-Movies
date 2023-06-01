export class Platform {
  constructor(
    public id: string,
    public name: string,
    public url: string,
    public movies: MoviePlatform[]
  ) {}
}

export class MoviePlatform {
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
