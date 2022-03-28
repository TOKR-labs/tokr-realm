import { ISDEV } from '@components/instructions/tools'
import type { EndpointTypes } from '@models/types'
import { Connection } from '@solana/web3.js'
import type { EndpointInfo } from '../@types/types'

const ENDPOINTS: EndpointInfo[] = [
	{
		name: ISDEV ? 'devnet' : 'mainnet',
		url: ISDEV ? (process.env.DEVNET_RPC || 'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899') : (process.env.MAINNET_RPC || 'https://ssc-dao.genesysgo.net/'), // confirm
	},
	{
		name: 'devnet',
		url: process.env.DEVNET_RPC || 'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899',
	},
	//   ,
	//   {
	//     name: 'localnet',
	//     url: 'http://127.0.0.1:8899',
	//   },
]

console.log('deployed ENDPOINTS:', ENDPOINTS)

export interface ConnectionContext {
	cluster: EndpointTypes
	current: Connection
	endpoint: string
}

export function getConnectionContext(cluster: string): ConnectionContext {
	const ENDPOINT = ENDPOINTS.find((e) => e.name === cluster) || ENDPOINTS[0]
	return {
		cluster: ENDPOINT!.name as EndpointTypes,
		current: new Connection(ENDPOINT!.url, 'recent'),
		endpoint: ENDPOINT!.url,
	}
}
