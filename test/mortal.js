var Mortal = artifacts.require("./Mortal.sol");

contract('Mortal', function (accounts) {

    let mortal;

    before('set mortal to deployed', async () => {
        mortal = await Mortal.new({ from: accounts[0] });
    });

    it('only the owner should be able to terminate the contract', async () => {
        assert.equal(accounts[0], await mortal.owner());

        try {
            await mortal.terminateContract({ from: accounts[1] });
            assert.fail("The test should have failed");
        } catch (error) {
            if (error.message.includes("failed")) {
                assert.fail(error.message);
            }
            assert.equal("UnAuthorized", error.reason);
        }

        await mortal.terminateContract({ from: accounts[0] });

        try {
            await mortal.owner();
            assert.fail("The test should have failed");
        } catch (error) {
            if (error.message.includes("failed")) {
                assert.fail(error.message);
            }
            assert.equal("Returned values aren't valid, did it run Out of Gas?", error.message);
        }
    });
});
