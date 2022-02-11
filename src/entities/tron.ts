import invariant from "tiny-invariant";
import { Currency, NativeCurrency, Token, } from ".";
import { WTRX } from "./wtrx";

export class Tron extends NativeCurrency {
    protected constructor(chainId: number) {
        super(chainId, 6, 'TRX', 'Tron')
    }

  public get wrapped(): Token {
    const wtrx = WTRX[this.chainId]
    invariant(!!wtrx, 'WRAPPED')
    return wtrx
  }

  private static _tronCache: { [chainId: number]: Tron } = {}

  public static onChain(chainId: number): Tron {
    return this._tronCache[chainId] ?? (this._tronCache[chainId] = new Tron(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
} 