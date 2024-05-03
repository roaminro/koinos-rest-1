import { getAddress } from '@/utils/addresses'
import { decodeNonce } from '@/utils/nonce'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /v1/account/{account}/next_nonce:
 *   get:
 *     tags: [Accounts]
 *     description: Returns the account's next nonce
 *     summary: Retrieves the next nonce for a given account.
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
 *              value: "10"
 */
export async function GET(request: Request, { params }: { params: { account: string } }) {
  try {
    const provider = getProvider()

    const { searchParams } = new URL(request.url)
    const account = await getAddress(params.account)
    const decode_nonce = searchParams.get('decode_nonce') !== 'false'

    try {
      const nextNonce = await provider.getNextNonce(account)
      if (decode_nonce) {
        return Response.json({
          value: await decodeNonce(nextNonce)
        })
      }
      return Response.json({
        value: nextNonce
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
