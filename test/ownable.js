var Ownable = artifacts.require("./Ownable.sol");

contract('Ownable', function (accounts) {

    let owned;

    before('set ownable to deployed', async () => {
        owned = await Ownable.new({ from: accounts[0] });
    });

    it('the owner is set to the account that deployed the contract', async () => {
        assert.equal(accounts[0], await owned.owner());
    });

    it('only the owner should be able to change the owner', async () => {
        assert.equal(accounts[0], await owned.owner());

        try {
            await owned.changeOwner(accounts[1], { from: accounts[1] });
            assert.fail("The test should have failed");
        } catch (error) {
            if (error.message.includes("failed")) {
                assert.fail(error.message);
            }
            assert.equal("UnAuthorized", error.reason);
        }

        await owned.changeOwner(accounts[1], { from: accounts[0] });
        assert.equal(accounts[1], await owned.owner());

        try {
            await owned.changeOwner(accounts[0], { from: accounts[0] });
            assert.fail("The test should have failed");
        } catch (error) {
            if (error.message.includes("failed")) {
                assert.fail(error.message);
            }
            assert.equal("UnAuthorized", error.reason);
        }
    });
});
