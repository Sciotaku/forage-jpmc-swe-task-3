import { ServerRespond } from './DataStreamer';

export interface Row {
//   stock: string,
//   top_ask_price: number,
  timestamp: Date,
  price_abc: number,
  price_def: number,
  ratio: number,
  lower_bound: number,
  upper_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
//     return serverResponds.map((el: any) => {
      const price_abc = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2; // Compute price_abc
      const price_def = (serverRespond[1].bottom_ask.price + serverRespond[1].bottom_bid.price) / 2; // Compute price_def
      const ratio = price_abc / price_def; // Compute ratio

      const lower_bound = 1 - 0.1; // Set lower bound
      const upper_bound = 1 + 0.1; // Set upper bound

      const trigger_alert = (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined; // Determine trigger_alert

      return {
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
        price_abc,
        price_def,
        ratio,
        lower_bound,
        upper_bound,
        trigger_alert,
//       return {
//         stock: el.stock,
//         top_ask_price: el.top_ask && el.top_ask.price || 0,
//         timestamp: el.timestamp,
      };
    })
  }
}
