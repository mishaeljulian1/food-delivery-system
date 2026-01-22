export class BaseEntity {
  constructor(
    public id: number,
    public createdAt: string = new Date().toISOString(),
    public updatedAt: string = new Date().toISOString()
  ) {}

  protected touch(): void {
    this.updatedAt = new Date().toISOString();
  }
}
