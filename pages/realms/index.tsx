import React, { useMemo, useState } from 'react'

import { getCertifiedRealmInfos, getUnchartedRealmInfos, RealmInfo } from '../../models/registry/api'

import { SearchIcon } from '@heroicons/react/outline'
import useWalletStore from '../../stores/useWalletStore'
import useQueryContext from '@hooks/useQueryContext'
import RealmsDashboard from './components/RealmsDashboard'
import Button from '@components/Button'
import { notify } from '@utils/notifications'
import { useRouter } from 'next/router'
import Input from '@components/inputs/Input'

const Realms = () => {
	const [realms, setRealms] = useState<ReadonlyArray<RealmInfo>>([])
	const [filteredRealms, setFilteredRealms] = useState<ReadonlyArray<RealmInfo>>([])
	const [isLoadingRealms, setIsLoadingRealms] = useState(true)

	const { actions, selectedRealm, connection } = useWalletStore((s) => s)
	const { connected, current: wallet } = useWalletStore((s) => s)
	const router = useRouter()
	const { fmtUrlWithCluster } = useQueryContext()
	const [searchString, setSearchString] = useState('')

	useMemo(async () => {
		if (connection) {
			const [certifiedRealms, uncharteredRealms] = await Promise.all([getCertifiedRealmInfos(connection), getUnchartedRealmInfos(connection)])
			const allRealms = [...certifiedRealms, ...uncharteredRealms]
			setRealms(allRealms)
			setFilteredRealms(allRealms)
			setIsLoadingRealms(false)
		}
		if (selectedRealm.realm) {
			actions.deselectRealm()
		}
	}, [connection])

	const handleCreateRealmButtonClick = async () => {
		if (!connected) {
			try {
				if (wallet) await wallet.connect()
			} catch (error) {
				const err = error as Error
				return notify({
					type: 'error',
					message: err.message,
				})
			}
		}
		router.push(fmtUrlWithCluster(`/realms/new`))
	}

	const filterDaos = (v) => {
		setSearchString(v)
		if (v.length > 0) {
			const filtered = realms.filter((r) => r.displayName?.toLowerCase().includes(v.toLowerCase()) || r.symbol?.toLowerCase().includes(v.toLowerCase()))
			setFilteredRealms(filtered)
		} else {
			setFilteredRealms(realms)
		}
	}

	return (
		<div>
			{/* <div className="flex items-center justify-between mb-6 w-full">
				<div className="flex space-x-4">
					<Input className="pl-8" value={searchString} type="text" onChange={(e) => filterDaos(e.target.value)} placeholder={`Search DAOs...`} prefix={<SearchIcon className="h-5 w-5 text-fgd-3" />} />
				</div>
			</div> */}
			<RealmsDashboard realms={filteredRealms} isLoading={isLoadingRealms}></RealmsDashboard>
		</div>
	)
}

export default Realms
