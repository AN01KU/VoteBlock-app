pragma solidity 0.5.16;

contract Contest{
	string public name = "Ankush";

	//store candidates
	

	struct Contestant {
		uint id;
		string name;
		uint voteCount;
		string party;
		uint age;
		string qualification;
	}
	

	struct Voter{
		bool hasVoted;
	 	uint vote;
	 	bool isRegistered;
	}

	uint public contestantsCount = 0;
	mapping(uint => Contestant) public contestants;
    mapping(address => Voter) public voters;
	
	// *************************************************************


	event ContestantAdded (
		uint id,
		string name,
		uint voteCount,
		string party,
		uint age,
		string qualification
	);

	event VoterAdded (
		bool hasVoted,
		uint vote,
		bool isRegistered
	);


	// ****************************************************************

	//add candidates
	
	function addCandidate(string memory _name, string memory _party, uint _age, string memory _qualification) public {
		contestantsCount ++;

		contestants[contestantsCount] = Contestant(contestantsCount, _name, 0, _party, _age, _qualification);

		emit ContestantAdded(contestantsCount, _name, 0, _party, _age, _qualification);
	}

	//add voter

	function voterRegisteration(address user) public {
		voters[user].isRegistered=true;

		emit VoterAdded(false,0,true);
	}

	 //inc votes
	 function vote(uint _contestantId) public {
		require(_contestantId > 0 && _contestantId<=contestantsCount);
		contestants[_contestantId].voteCount++;
	 }
} 	

