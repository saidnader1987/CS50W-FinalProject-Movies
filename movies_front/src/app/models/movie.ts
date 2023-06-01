export class Movie {
  constructor(
    public id: string,
    public title: string,
    public poster: string,
    public duration: number,
    public country: string,
    public releaseDate: Date,
    public popularity: number
  ) {}
}
