import Contest from '../contracts/Contest.json'
import Web3 from 'web3'

const loadWeb3=async()=>{
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const netID = await web3.eth.net.getId();
    const deployedNetwork = Contest.networks[netID]
    const contest = new web3.eth.Contract(
      Contest.abi,
      deployedNetwork.address
    )
    return contest 
}

export default loadWeb3;