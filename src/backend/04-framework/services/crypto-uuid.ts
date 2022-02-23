import { IUUIDService } from "../../01-domain/service/create-uuid";
import { randomUUID } from 'crypto'

export default class CryptoUUIDService implements IUUIDService {
  create(): string {
    const uuid = randomUUID()
    return uuid
  }
}