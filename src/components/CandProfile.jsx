import React from 'react'
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Contest from '../contracts/Contest.json'



// import '../css/profile.css';

const candProfile = ({id, name, age, qualification, party, votes, account }) => {
    const [voteID, setVoteID] =  useState(null);


  


    

    const handleSubmit = (event)=> {
       var id = event.target.id;


       console.log(id);
         (async () => {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const netID = await web3.eth.net.getId();
      const deployedNetwork = Contest.networks[netID]
      const contest = new web3.eth.Contract(
        Contest.abi,
        deployedNetwork.address
      )
        await contest.methods.vote(id).send({from: account.account})
     

    })()


    }
  return (

    <div className="frame">
  <div className="center">
    
		<div className="profile">
			<div className="image">
				<div className="circle-1"></div>
				<div className="circle-2"></div>
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSMbK0UEgePB2PoFdTbDpZHR04ICjHKoLbi4XuHGdJCzxKmMvG4qJf24cpUEVWdkk_AiI&usqp=CAU" width="70" height="70" alt="Jessica Potter" />
			</div>
			
			<div className="name">Candidate Id: {id }</div>
			<div className="job">Name: {name} </div>
            <div className="job">Party: {party} </div>

			
		
		</div>
		
		<div className="stats">
			<div className="box">
            <span className="parameter">Age: </span>
				<span className="value">{age}</span>
				
			</div>
			<div className="box">
            	<span className="parameter">Qualification:</span>

				<span className="value">{qualification}</span>
			</div>
			<div className="box">
            	<span className="parameter">Votes: </span>

				<span className="value">{votes}</span>
			</div>
		</div>
        	<div className="actions">
				<button id={id}  onClick={handleSubmit} className="btn">Vote</button>
			</div>
  </div>
</div>
  )
}

export default candProfile