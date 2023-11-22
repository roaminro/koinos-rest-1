import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { interfaces } from 'koilib'
import { decodeEvents } from '@/utils/events'

/**
 * @swagger
 * /api/decode/events:
 *   post:
 *     tags: [Decode]
 *     description: This endpoint takes an array of "encoded" events and returns an array of "decoded" events.
 *
 *     parameters:
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *
 *     requestBody:
 *       description: Input is expected to be an array of "encoded" events.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/EncodedEvent'
 *
 *     responses:
 *       200:
 *         description: Call response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 * components:
 *   schemas:
 *     EncodedEvent:
 *             type: object
 *             properties:
 *               sequence:
 *                 type: integer
 *                 nullable: true
 *               source:
 *                 type: string
 *               name:
 *                 type: string
 *               data:
 *                 type: string
 *               impacted:
 *                 type: array
 *                 items:
 *                    type: string
 */

export async function POST(request: Request) {
  try {
    try {
      const events = (await request.json()) as interfaces.EventData[]
      const result = await decodeEvents(events)

      return Response.json(result)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}