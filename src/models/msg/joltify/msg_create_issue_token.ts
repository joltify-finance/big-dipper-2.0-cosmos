import * as R from 'ramda';
import { Categories } from '../types';

class MsgCreateIssueToken {
  public category: Categories; // required
  public type: string; // required
  public json: any; // required

  public creator: string
  public receiver: string
  public index: string
  public coin: MsgCoin

  constructor(payload: any) {
    this.category = 'others'; // required
    this.type = payload.type; // required
    this.json = payload.json; // required

    this.creator = payload.creator
    this.receiver = payload.receiver
    this.index = payload.index
    this.coin = payload.coin
  }

  static fromJson(json: any) {
    return new MsgCreateIssueToken({
      json,
      type: json['@type'],
      coin: {
        denom: R.pathOr('', ['coin', 'denom'], json),
        amount: R.pathOr('0', ['coin', 'amount'], json),
      },
      index: json.index,
      creator: json.creator,
      receiver: json.receiver
    });
  }
}

export default MsgCreateIssueToken