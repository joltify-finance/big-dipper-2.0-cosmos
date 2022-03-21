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

/*
{
	"coin": {
		"denom": "JUSD",
		"amount": "6000000000000000000"
	},
	"@type": "/joltify.joltifychain.vault.MsgCreateIssueToken",
	"index": "0xf03e3aa5ec6b7f1a551830a28b92cca3398c9f547c4b47616cae4feba210b800",
	"creator": "jolt1jzphsa50jp93d3kg2xrk4ch3je00ruyjhr6uj7",
	"receiver": "jolt14cq7c25ttv8jar9l6ljnqkl65pk3g830lskfnd"
}
*/