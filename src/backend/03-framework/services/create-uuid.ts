import { ICreateUUIDService } from "../../01-domain/service/create-uuid";
import { randomUUID } from 'crypto'

export default class CryptoUUIDService implements ICreateUUIDService {
  create(): string {
    const uuid = randomUUID()
    return uuid
  }
}