pragma solidity 0.5.16;

contract Contest{
	string public name = "Ankush";

	//store candidates
	uint public contestantsCount = 12;
	mapping(uint => Contestant) public contestants;

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
    mapping(address => Voter) public voters;

	//for testing purpose

	event ContestantAdded (
		uint id,
		string name,
		uint voteCount,
		string party,
		uint age,
		string qualification
	);

	event Voted(
		uint id,
		string name,
		uint voteCount,
		string party,
		uint age,
		string qualification
	);

	//add candidates
	
	function addCandidate(string memory _name, string memory _party, uint _age, string memory _qualification) public {
		contestantsCount ++;

		contestants[contestantsCount] = Contestant(contestantsCount, _name, 0, _party, _age, _qualification);

		emit ContestantAdded(contestantsCount, _name, 0, _party, _age, _qualification);
	}


		function voterRegisteration(address user) public {
		voters[user].isRegistered=true;
	}

	// inc votes
	function vote(uint _contestantId) public {
		require(_contestantId > 0 && _contestantId<=contestantsCount);
			contestants[_contestantId].voteCount++;

		emit Voted(_contestantId, contestants[_contestantId].name, contestants[_contestantId].voteCount, contestants[_contestantId].party, contestants[_contestantId].age, contestants[_contestantId].qualification);
	}


} 	

