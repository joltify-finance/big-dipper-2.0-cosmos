import * as R from 'ramda';
import { Categories } from '../types';

class MsgSend {
  public category: Categories;
  public type: string;
  public fromAddress: string;
  public toAddress: string;
  public amount: MsgCoin[];
  public json: any;

  constructor(payload: any) {
    this.category = 'bank';
    this.type = payload.type;
    this.fromAddress = payload.fromAddress;
    this.toAddress = payload.toAddress;
    this.amount = payload.amount;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgSend({
      json,
      type: json['@type'],
      fromAddress: json.from_address,
      toAddress: json.to_address,
      amount: json?.amount.map((x) => {
        return ({
          denom: x?.denom,
          amount: R.pathOr('0', ['amount'], x),
        });
      }),
    });
  }
}

export default MsgSend;

/*
{
	"@type": "/cosmos.bank.v1beta1.MsgSend",
	"amount": [
		{
			"denom": "JUSD",
			"amount": "5000000000000000000"
		}
	],
	"to_address": "jolt14cq7c25ttv8jar9l6ljnqkl65pk3g830lskfnd",
	"from_address": "jolt1xdpg5l3pxpyhxqg4ey4krq2pf9d3sphmmuuugg"
}
*/