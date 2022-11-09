pragma solidity 0.5.16;

contract Contest{
	//store candidate/contestant
	
	struct Contestant {
		uint id;
		string name;
		uint voteCount;
		string party;
		uint age;
		string qualification;
	}

	//store voter

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

	// vote
	function vote(uint _contestantId) public {
		require(_contestantId > 0 && _contestantId<=contestantsCount);
		require(voters[msg.sender].isRegistered);
		require(!voters[msg.sender].hasVoted);

		contestants[_contestantId].voteCount++;
		voters[msg.sender].hasVoted=true;
		voters[msg.sender].vote=_contestantId;
	}

	string public currentPhase = 'registration';

	function changePhase(string memory phase) public {
		currentPhase = phase;
	}
} 	

