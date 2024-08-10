#Smart Contract Development (Solidity)
#Create a Solidity File (LuxuryGoods.sol):
pragma solidity ^0.8.0;

contract LuxuryGoods {
    struct Product {
        uint256 productId;
        string productName;
        string brand;
        string manufacturerId;
        bool isRegistered; 
    }

    mapping (uint256 => Product) public products;
    mapping (string => bool) public registeredManufacturers;

    event ProductRegistered(uint256 productId, string productName, string brand, string manufacturerId);
    event ProductOwnershipTransferred(uint256 productId, string from, string to);

    modifier onlyRegisteredManufacturer() {
        require(registeredManufacturers[msg.sender], "Only registered manufacturers can perform this action.");
        _; 
    }

    function registerManufacturer(string memory _manufacturerId) public {
        require(!registeredManufacturers[_manufacturerId], "Manufacturer already registered.");
        registeredManufacturers[_manufacturerId] = true;
    }

    function registerProduct(uint256 _productId, string memory _productName, string memory _brand) public onlyRegisteredManufacturer {
        require(!products[_productId].isRegistered, "Product already registered.");
        products[_productId] = Product(_productId, _productName, _brand, msg.sender, true);
        emit ProductRegistered(_productId, _productName, _brand, msg.sender);
    }

    function transferOwnership(uint256 _productId, string memory _newOwner) public {
        require(products[_productId].isRegistered, "Product not registered.");
        string memory previousOwner = products[_productId].manufacturerId;
        products[_productId].manufacturerId = _newOwner;
        emit ProductOwnershipTransferred(_productId, previousOwner, _newOwner);
    }

    function getProductDetails(uint256 _productId) public view returns (Product memory) {
        return products[_productId];
    }
}


