// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyManagementSystem {
    uint256 public totalTransactions;
    struct Transaction{
        string productid;
        string name;
        string typee;
        string Action;//sold or bought
    }
    mapping (string =>Transaction) Alltransactions;
   function addTransaction(string memory _productid ,string memory name,string memory typee, uint256 quantity, uint256 buyrate) public 
   { 
        if (compareStrings(typee, "in")) 
        {
            buyProduct(_productid,name,typee,buyrate, quantity);
        }
        // else if (compareStrings(typee, "out")) 
        // {
        //     sellProduct(sellrate, quantity);
        // }
    }
    function compareStrings(string memory a, string memory b) private pure returns (bool) 
    {
            return (keccak256(bytes(a)) == keccak256(bytes(b)));
    }
    function buyProduct(string memory _productid,string memory name,string memory typee,uint256 buyrate,uint256 quantity) public payable {
        uint256 temp=buyrate*quantity;
        require(msg.value >= temp, "Insufficient balance");
        //acept or reject wali chez idhr honi
        uint256 temp1=generateRandomValue();
        if(temp1==1)
        {
            address payable recipient = payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
            recipient.transfer(temp);
            Alltransactions[_productid]=Transaction(_productid,name,typee,"Acepted");
            // quantity += quantity;//quantity update krni ha...
        }
        else
        {
             Alltransactions[_productid]=Transaction(_productid,name,typee,"Rejected");
        }
    }
    function generateRandomValue() public view returns (uint256) {
    uint256 blockNumber = block.number;
    uint256 randomValue = blockNumber % 2;
    return randomValue;
    }

    // function sellProduct(uint256 sellrate,uint256 quantity) public {
    //     uint256 amount = sellrate * quantity;
    //     address payable recipient = payable(msg.sender);
    //     recipient.transfer(amount);
    //     // quantity -= quantity;//quantity update krni idhr
    // }
}
