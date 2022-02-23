export interface IDatabaseConnection {
  connect(): Promise<void>
  close(): Promise<void>
}