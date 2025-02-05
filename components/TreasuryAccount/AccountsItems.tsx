import useGovernanceAssets from '@hooks/useGovernanceAssets'
import { GovernedTokenAccount } from '@utils/tokens'
import React, { useEffect, useState } from 'react'
import AccountItem from './AccountItem'

const AccountsItems = () => {
  const { governedTokenAccounts } = useGovernanceAssets()
  const [treasuryAccounts, setTreasuryAccounts] = useState<
    GovernedTokenAccount[]
  >([])

  useEffect(() => {
		async function prepTreasuryAccounts() {
			setTreasuryAccounts(governedTokenAccounts)
		}
		prepTreasuryAccounts()
  }, [JSON.stringify(governedTokenAccounts)])

  return (
    <div className="space-y-3">
      {treasuryAccounts.map((accountWithGovernance, index) => {
        return (
          <AccountItem
            governedAccountTokenAccount={accountWithGovernance}
            key={accountWithGovernance?.token?.publicKey.toBase58() + "_" + index}
          />
        )
      })}
    </div>
  )
}

export default AccountsItems
