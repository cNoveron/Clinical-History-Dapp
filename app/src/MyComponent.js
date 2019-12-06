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
      <h3>Total Supply: </h3>
      <ContractForm
        contract="TeebNFT"
        method="updateMedfileNFT" />
      <h3>NFTDescription: </h3>
      <ContractForm
        contract="TeebNFT"
        method="NFTDescription" />
      <h3>grantAccessTo: </h3>
      <ContractForm
        contract="TeebNFT"
        method="grantAccessTo"
        labels={["To Doctor", "Amount to Send"]} />
      <h3>revokeAccessTo: </h3>
      <ContractForm
        contract="TeebNFT"
        method="revokeAccessTo"
        labels={["To Doctor", "Amount to Send"]} />
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
