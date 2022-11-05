// import Contest from '../contracts/Contest.json'
// import Web3 from 'web3'

// export const load = async () => {
//     const { accountAddress } = await loadWeb3()
//     const { contest , count } = await loadContract()

//     return { accountAddress, contest, count}
// }

// const loadCandidates= async(contest)=>{
//     const count = await contest.methods.contestantsCount().call()
//     const candidates = []
//     for (var i=0;i<count;i++){
//         const candidate = await contest.methods.contestants(i).call()
//         candidates.push(candidate)
//     }
//     return candidates
// }

// const loadContract = async () => {
//     const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
//     const netID = await web3.eth.net.getId();
//     const deployedNetwork = Contest.networks[netID]
//     const contest = new web3.eth.Contract(
//         Contest.abi,
//         deployedNetwork.address
//     )

//     const candidates = await loadCandidates(contest)
//     return { contest, candidates}
// }

// const loadWeb3 = async () => {
//     if (window.ethereum) {
//         try {
//             const accounts = await window.ethereum.request({
//                 method: 'eth_requestAccounts',
//             })
//             return accounts[0]
//         } catch (error) {
//             console.log("error connecting to accounts");
//         }
//     } else {
//         console.log('no metamask');
//     }
// }