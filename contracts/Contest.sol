pragma solidity 0.5.16;

contract Contest{
	string public name = "Ankush";

	//store candidates
	uint public contestantsCount = 0;
	uint public votersCount = 0;
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
		uint id;
		bool hasVoted;
	 	uint vote;
	 	bool isRegistered;
		uint adhar;
		address ads;
		
	 }


    mapping(uint => Voter) public voters;

	

	event ContestantAdded (
		uint id,
		string name,
		uint voteCount,
		string party,
		uint age,
		string qualification
	);

	event VoterAdded (
		uint id,
		bool hasVoted,
	 	uint vote,
	 	bool isRegistered,
		uint adhar,
		address ads
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
	function addVoters(address _user, uint _adhar) public {
		votersCount ++;
		bool hasVoted = false;
	 	uint vote = 0;
	 	bool isRegistered = true;
		
		voters[votersCount] = Voter(votersCount, hasVoted, vote, isRegistered, _adhar, _user);
		emit VoterAdded(votersCount, hasVoted, vote, isRegistered, _adhar, _user );
	}


		function voterRegisteration(address user) public {
		voters[votersCount].isRegistered=true;
	}

	// inc votes
	function vote(uint _contestantId) public {
		require(_contestantId > 0 && _contestantId<=contestantsCount);
		contestants[_contestantId].voteCount++;

		emit Voted(_contestantId, contestants[_contestantId].name, contestants[_contestantId].voteCount, contestants[_contestantId].party, contestants[_contestantId].age, contestants[_contestantId].qualification);
	}


} 	

