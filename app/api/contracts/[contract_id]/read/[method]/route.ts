import { Contract, Provider } from 'koilib'
import { config } from '@/app.config'
import { fixAbi, getContractId, processArgs } from '@/utils/contracts'
import qs from 'qs'
import { AppError, handleError, getErrorMessage } from '@/utils/errors'

/**
 * @swagger
 * /api/contracts/{contract_id}/read/{method}:
 *   get:
 *     tags: [Contracts]
 *     description: Read the contract contract using the method and arguments provided
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: true
 *      - name: method
 *        in: path
 *        description: Method of the contract to call
 *        required: true
 *      - name: arguments
 *        in: query
 *        schema:
 *          type: object
 *     responses:
 *       200:
 *        description: Call response
 *        type: application/json
 */
export async function GET(
  request: Request,
  { params }: { params: { contract_id: string; method: string } }
) {
  try {
    const contract_id = await getContractId(params.contract_id)

    const method = params.method

    let { search } = new URL(request.url)

    let args = {}
    if (search) {
      if (search.startsWith('?')) {
        search = search.substring(1)
      }
      args = qs.parse(search, { allowDots: true })
    }

    const provider = new Provider(config.jsonRPC)

    let contract = new Contract({
      id: contract_id,
      provider
    })

    try {
      // fetch abi from node
      let abi = await contract.fetchAbi()

      if (!abi) {
        throw new AppError('contract abi not available')
      }

      if (!contract.functions[method]) {
        throw new AppError(`method "${method}" does not exist`)
      }

      // fix abi incompatibilities
      abi = fixAbi(abi)

      contract = new Contract({
        id: contract_id,
        provider,
        abi
      })

      // process args
      if (abi.methods[method].argument) {
        args = await processArgs(
          args,
          contract.serializer?.root,
          contract.serializer?.root.lookupType(abi.methods[method].argument!)
        )
      }

      const { result } = await contract.functions[method](args)

      return Response.json(result)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
