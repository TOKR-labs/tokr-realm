import styled from '@emotion/styled'
import { ChevronRightIcon } from '@heroicons/react/solid'
import ProposalStateBadge from './ProposalStatusBadge'
import Link from 'next/link'
import { Proposal, ProposalState } from '@solana/spl-governance'
import ApprovalQuorum from './ApprovalQuorum'
import useRealm from '../hooks/useRealm'
import useProposalVotes from '../hooks/useProposalVotes'
import ProposalTimeStatus from './ProposalTimeStatus'

import useQueryContext from '../hooks/useQueryContext'
import { PublicKey } from '@solana/web3.js'
import VoteResults from './VoteResults'
import { useEffect, useLayoutEffect } from 'react'

type ProposalCardProps = {
	proposalPk: PublicKey
	proposal: Proposal,
	cta?: any
}

const StyledSvg = styled(ChevronRightIcon)``

const StyledCardWrapper = styled.div`
	:hover {
		${StyledSvg} {
			transform: translateX(4px);
		}
	}
`

const ProposalCard = ({ proposalPk, proposal, cta }: ProposalCardProps) => {
	const { symbol } = useRealm()
	const { fmtUrlWithCluster } = useQueryContext()
	const { yesVoteProgress, yesVotesRequired } = useProposalVotes(proposal)


	return (
		<div className="border border-green">
			<Link href={fmtUrlWithCluster(`/dao/${symbol}/proposal/${proposalPk.toBase58()}`)}>
				<a>
					<StyledCardWrapper>
						<div className="p-4 flex items-center justify-between">
							<div className="flex-grow flex">
								<div className="flex-grow flex items-center justify-between">
									<div className="flex flex-col">
										<h3 className="text-fgd-1">{proposal.name}</h3>
										<ProposalTimeStatus proposal={proposal} />
									</div>
									<div className="flex-shrink-0 flex items-center px-4 pt-1">
										<ProposalStateBadge cta={cta} proposalPk={proposalPk} proposal={proposal} open={false} />
										{/* <StyledSvg className="default-transition h-6 ml-2 text-primary-light w-6" /> */}
									</div>
								</div>
							</div>
							<span className="default-transition h-6 ml-2 text-primary-light w-6 flex-shrink-0 flex items-center">&gt;</span>
						</div>
						{/* {proposal.state === ProposalState.Voting && (
							<div className="border-t border-fgd-4 flex flex-col lg:flex-row mt-2 p-4">
								<div className="pb-3 lg:pb-0 lg:border-r lg:border-fgd-4 lg:pr-4 w-full lg:w-1/2">
									<VoteResults isListView proposal={proposal} />
								</div>
								<div className="lg:pl-4 w-full lg:w-1/2">
									<ApprovalQuorum progress={yesVoteProgress} yesVotesRequired={yesVotesRequired} />
								</div>
							</div>
						)} */}
					</StyledCardWrapper>
				</a>
			</Link>
		</div>
	)
}

export default ProposalCard
