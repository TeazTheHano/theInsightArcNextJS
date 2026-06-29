import { InspirationContract } from "./contracts/inspiration.contract";

export interface IInspirationGateway {
  getInspirationList(): Promise<InspirationContract[]>;
}
