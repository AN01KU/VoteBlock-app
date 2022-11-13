
const Contest = artifacts.require('./Contest.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Contest', ([deployer, author, tipper]) => {
    let contest

    before(async () => {
        contest = await Contest.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await contest.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

    })

    describe('contestants', async()=>{
        let result, contestantsCount
        const name='Amar'
        const age = 21
        const party = 'Congress'
        const qualification = 'MBA'

        before(async()=>{
            result = await contest.addCandidate(name, party, age, qualification)
            contestantsCount = await contest.contestantsCount()
        })
        it('add candidates', async()=>{
            assert.equal(contestantsCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), contestantsCount.toNumber(), 'id is correct');
            assert.equal(event.name, name, 'number is correct');
            assert.equal(event.age, age, 'age is correct');
            assert.equal(event.party, party, 'party is correct');
            assert.equal(event.qualification, qualification, 'qualification is correct');            
            // assert.equal(event.id.t)            
        })

        it('list candidates', async()=>{
            const candidate = await contest.contestants(contestantsCount)

            assert.equal(candidate.id.toNumber(), contestantsCount.toNumber(), 'id is correct');
            assert.equal(candidate.name, name, 'number is correct');
            assert.equal(candidate.age, age, 'age is correct');
            assert.equal(candidate.party, party, 'party is correct');
            assert.equal(candidate.qualification, qualification, 'qualification is correct');        
        })
    })
})

