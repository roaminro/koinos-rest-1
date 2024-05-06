import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'
import { decode } from 'punycode'

/**
 * @swagger
 * /api/account/{account}/nonce:
 *   get:
 *     tags: [Accounts]
 *     description: Returns the account's nonce
 *     summary: Fetches the current nonce of a specified account.
 *     parameters:
 *      - name: account
 *        in: path
 *        schema:
 *          type: string
 *          example: 1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS
 *        description: The account address to query
 *        required: true
 *      - name: decode_nonce
 *        in: query
 *        schema:
 *          type: boolean
 *        description: Whether or not the nonce should be decoded
 *     responses:
 *       200:
 *        description: Value
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                value:
 *                  type: string
 *            example:
 *              value: "9"
 */
export async function GET(request: Request, { params }: { params: { account: string } }) {
  try {
    const provider = getProvider()

    const { searchParams } = new URL(request.url)
    const account = await getAddress(params.account)
    const decode_nonce = searchParams.get('decode_nonce') !== 'false'

    try {
      const nonce = await provider.getNonce(account, decode_nonce)
      return Response.json({
        value: nonce
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
