pragma solidity ^0.5.0;

import "./ERC721Full.sol";
import "./Roles.sol";

/**
 * @title TeebNFT Contract
 * @dev Manage Medfiles associated to an ERC721 NFT Token
 */
contract TeebNFT is ERC721Full {

  using Roles for Roles.Role;

  Roles.Role private _admins; // Role Administrators
  Roles.Role private _doctors; // Role Doctors

  // Events

  event AdminAdded(address indexed account);
  event AdminRemoved(address indexed account);

  event DoctorAdded(address indexed account);
  event DoctorRemoved(address indexed account);


  modifier onlyAdmin() {
      require(_admins.has(_msgSender()), "AdminRole: caller does not have the Admin role");
      _;
  }

  modifier onlyDoctor() {
      require(_doctors.has(_msgSender()), "DoctorRole: caller does not have the Doctor role");
      _;
  }

  struct Medfile {
    uint approved_medics; // Number of doctors approved to modify Medfile
    bytes32 hash_medfile; // Hash of last version of Medfile
  }

  uint public total_mf; // Total of medfiles recorded

  mapping (uint => Medfile) medfile; // Mapping from token ID to struct Medfile

  constructor() ERC721Full("TEEB_NFT", "TEEB") public {
    _admins.add(_msgSender());
    emit AdminAdded(_msgSender());
  }

  /**
   * @dev Only address w/DoctorRole can record a new medfile as a new token owned by the given patient
   * @param nftOwner -  address of the patient who will own new token
   * @param hashMF - bytes32 hash of the file stored off-chain
   * @return bool whether the new token is minted by given doctor
   */
  function newMedfileNFT(address nftOwner, bytes32 hashMF) public onlyDoctor returns (bool) {
    Medfile storage storedMedfile = medfile[total_mf];

    storedMedfile.approved_medics += 1;
    storedMedfile.hash_medfile = hashMF;
    _safeMint(nftOwner,total_mf);
    total_mf += 1;

    return true;
  }

  /**
   * @dev Only address w/DoctorRole can modify a medfile
   * @param idMF -  uint256 ID of the token to be updated
   * @param newHash - bytes32 hash of the new file updated off-chain
   * @return bool whether the info of the token is updated succesfully
   */
  function updateMedfileNFT(uint idMF, bytes32 newHash) public onlyDoctor returns (bool) {
    require(isApprovedForNFT(_msgSender(),idMF), "ERC721: doctor is not approved for making changes");
    medfile[idMF].hash_medfile = newHash;
    return true;
  }

  function NFTDescription(uint idMF) public view returns (uint _approveds,bytes32 _hash,address _owner) {
    _approveds = medfile[idMF].approved_medics;
    _hash = medfile[idMF].hash_medfile;
    _owner = ownerOf(idMF);
  }

  function grantAccessTo(address _doctor, uint idMF) public returns (bool) {
    require(isDoctor(_doctor), "DoctorRole: recipient does not have the Doctor Role");
    medfile[idMF].approved_medics += 1;
    approve(_doctor, idMF);
    return true;
  }

  function revokeAccessTo(address _doctor, uint idMF) public returns (bool) {
    require(isApprovedForNFT(_doctor, idMF), "DoctorRole: doctor does not have access to NFT Medfile");
    medfile[idMF].approved_medics -= 1;
    revoke(_doctor, idMF);
    return true;
  }

  function addDoctorRole(address medic) public onlyAdmin returns (bool) { // implementar AdminRole
    _doctors.add(medic);
    emit DoctorAdded(medic);
    return true;
  }

  function removeDoctorRole(address medic) public onlyAdmin returns (bool) { // implementar AdminRole
    _doctors.remove(medic);
    emit DoctorRemoved(medic);
    return true;
  }

  function addAdminRole(address _admin) public onlyAdmin returns (bool) { // implementar AdminRole
    _admins.add(_admin);
    emit AdminAdded(_admin);
    return true;
  }

  function removeAdminRole(address _admin) public onlyAdmin returns (bool) { // implementar AdminRole
    // poner condicional para address != address(0)
    _admins.remove(_admin);
    emit AdminRemoved(_admin);
    return true;
  }

  function isAdmin(address account) public view returns (bool) {
      return _admins.has(account);
  }

  function isDoctor(address account) public view returns (bool) {
      return _doctors.has(account);
  }


}
