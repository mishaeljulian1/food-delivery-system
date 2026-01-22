import { BaseEntity } from './base-entity.model';

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  defaultAddress: string;
}

export class AppUser extends BaseEntity implements UserProfile {
  constructor(
    id: number,
    public fullName: string,
    public email: string,
    private _phone: string,
    public defaultAddress: string
  ) {
    super(id);
  }

  get phone(): string {
    return this._phone;
  }

  set phone(newPhone: string) {
    this._phone = newPhone;
    this.touch();
  }
}
