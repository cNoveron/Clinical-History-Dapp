import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "@drizzle/react-components";

import logo from "./logo.png";

export default ({ accounts }) => (
  <div className="App">
    <div>
      <img src={logo} alt="drizzle-logo" />
      <h1>Drizzle Examples</h1>
      <p>Examples of how to get started with Drizzle in various situations.</p>
    </div>

    <div className="section">
      <h2>Active Account</h2>
      <AccountData accountIndex={0} units="ether" precision={3} />
    </div>

    <div className="section">
      <h2>TutorialToken</h2>
      <p>
        Here we have a form with custom, friendly labels. Also note the token
        symbol will not display a loading indicator. We've suppressed it with
        the <code>hideIndicator</code> prop because we know this variable is
        constant.
      </p>
      <h3>newMedfileNFT: </h3>
      <ContractForm
        contract="TeebNFT"
        method="newMedfileNFT"
        labels={["nftOwner", "hashMF"]} />
      <h3>updateMedfileNFT: </h3>
      <ContractForm
        contract="TeebNFT"
        method="updateMedfileNFT"
        labels={["_doctor", "idMF"]} />
      <h3>NFTDescription: </h3>
      <ContractForm
        contract="TeebNFT"
        method="NFTDescription"
        labels={["idMF"]} />
      <h3>grantAccessTo: </h3>
      <ContractForm
        contract="TeebNFT"
        method="grantAccessTo"
        labels={["_doctor", "idMF"]} />
      <h3>revokeAccessTo: </h3>
      <ContractForm
        contract="TeebNFT"
        method="revokeAccessTo"
        labels={["_doctor", "idMF"]} />
      <h3>addDoctorRole: </h3>
      <ContractForm
        contract="TeebNFT"
        method="addDoctorRole"
        labels={["medic"]} />
      <h3>removeDoctorRole: </h3>
      <ContractForm
        contract="TeebNFT"
        method="removeDoctorRole"
        labels={["medic"]} />
      <h3>addAdminRole: </h3>
      <ContractForm
        contract="TeebNFT"
        method="addAdminRole"
        labels={["_admin"]} />
      <h3>removeAdminRole: </h3>
      <ContractForm
        contract="TeebNFT"
        method="removeAdminRole"
        labels={["_admin"]} />
      <h3>isAdmin: </h3>
      <ContractForm
        contract="TeebNFT"
        method="isAdmin"
        labels={["account"]} />
      <h3>isDoctor: </h3>
      <ContractForm
        contract="TeebNFT"
        method="isDoctor"
        labels={["account"]} />
    </div>
    <div className="section">
      <h2>Teeb</h2>
      <p>
        Finally this contract shows data types with additional considerations.
        Note in the code the strings below are converted from bytes to UTF-8
        strings and the device data struct is iterated as a list.
      </p>
      <p>
        <strong>Total of medfiles recorded: </strong>
        <ContractData contract="TeebNFT" method="total_mf" />
      </p>
    </div>
  </div>
);
