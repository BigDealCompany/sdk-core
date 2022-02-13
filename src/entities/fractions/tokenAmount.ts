import JSBI from "jsbi";
import invariant from "tiny-invariant";
import { CurrencyAmount } from ".";
import { currencyEquals, Token } from "..";
import { BigintIsh } from "../..";

export class TokenAmount extends CurrencyAmount {
    public readonly token: Token;

    constructor(token: Token, amount: BigintIsh) {
        super(token, amount)
        this.token = token;
    }

    public add(other:TokenAmount): TokenAmount {
        invariant(this.token.equals(other.token), 'TOKEN')
        return new TokenAmount(this.token, JSBI.add(this.raw, other.raw))
    }

    public subtract(other: TokenAmount): TokenAmount {
        invariant(this.token.equals(other.token), 'TOKEN')
        return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw))
    }
}