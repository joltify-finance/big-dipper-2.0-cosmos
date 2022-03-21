import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgCreateIssueToken } from '@models';
import { useProfileRecoil } from '@recoil/profiles';
import {
  formatToken, formatNumber,
} from '@utils/format_token';
import Big from 'big.js'

const CreateIssueToken = (props: {
  message: MsgCreateIssueToken;
}) => {
  const { message } = props;
  
  const creator = useProfileRecoil(message.creator)
  const receiver = useProfileRecoil(message.receiver)
  const parsedAmount = () => {
    const amount = formatToken(message.coin.amount, message.coin.denom);
    return `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;
  }

  const formatedAmount = formatToken(message.coin.amount, message.coin.denom)
  const index =  message.index

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:MsgCreateIssueToken"
        components={[
          (
            <Name
              address={message.creator}
              name={message.creator}
            />
          ),
          (
            <Name
              address={message.receiver}
              name={message.receiver}
            />
          )
        ]}
        values={{
          amount: formatedAmount.value + ' ' + formatedAmount.displayDenom,
        }}
      />
    </Typography>
  );
};

export default CreateIssueToken;
