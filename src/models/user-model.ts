import { randomUUID } from "crypto";

interface UserModelInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  estate: string;
  city: string;
  neightborhood: string;
  cep: string;
}

export class UserModel {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public phoneNumber: string;
  public estate: string;
  public city: string;
  public neightborhood: string;
  public cep: string;
  public created_at: Date;

  constructor({
    id,
    name,
    email,
    password,
    phoneNumber,
    estate,
    city,
    neightborhood,
    cep,
  }: UserModelInterface) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.estate = estate;
    this.city = city;
    this.neightborhood = neightborhood;
    this.cep = cep;
    this.created_at = new Date();
  }
}
