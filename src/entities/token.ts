import invariant from 'tiny-invariant'
import { ChainId } from '..'
import { validateAndParseAddress } from '../utils/validateAndParseAddress'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId;
  /**
   * The contract address on the chain on which this token lives
   */
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId;
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }

  public equals(other:Token): boolean {
    if(this === other) {
      return true;
    }
    return this.chainId === other.chainId && this.address === other.address;
    
    
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): Token {
    return this
  }
}

export function currencyEquals(currencyA:Currency, currencyB: Currency) {
if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}

export const WETH: { [chainId: number]: Token} = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x891CDB91D149F23B1A45D9C5CA78A88D0CB44C18', 6, 'WTRX', 'Wrapped TRX'),
  [ChainId.NILE]: new Token(ChainId.MAINNET, '0x8f44113A985076431b77f6078f0929f949cB8836', 6, 'WTRX', 'Wrapped TRX'),
  [ChainId.SHASTA]: new Token(ChainId.MAINNET, '0xB970B980C520EC3F49921C2727BFA6DE79E7226A', 6, 'WTRX', 'Wrapped TRX'),
}
