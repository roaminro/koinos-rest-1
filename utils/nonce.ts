import { utils } from 'koilib'
import { koinos } from '@koinos/proto-js';

export async function decodeNonce(str: string) {
  const value_type_msg = koinos.chain.value_type.decode(utils.decodeBase64url(str));

  return String(value_type_msg.uint64_value);
}
