// Define a global variable to store the user's wallet address
window.userWalletAddress = null;
const connectWallet = document.getElementById("connectWallet");
const walletAddress = document.getElementById("walletAddress");
const walletBalance = document.getElementById("walletBalance");
const popup = document.getElementById("popup");
const popupAmount = document.getElementById("popupAmount");
const popupTxId = document.getElementById("popupTxId");

// Function to connect the wallet with MetaMask and initialize Web3
async function connectWalletwithMetaMask() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);

    try {
      // Request access to the user's accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      window.userWalletAddress = accounts[0];
      walletAddress.innerText = window.userWalletAddress;

      connectWallet.innerText = "Sign Out";
      connectWallet.removeEventListener("click", connectWalletwithMetaMask);
      setTimeout(() => {
        connectWallet.addEventListener("click", signOutOfMetaMask);
      }, 200);
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  } else {
    console.error("Web3 not available.");
  }
}

// Function to sign out of MetaMask
function signOutOfMetaMask() {
  window.userWalletAddress = null;
  walletAddress.innerText = "";
  connectWallet.innerText = "Connect Wallet";

  connectWallet.removeEventListener("click", signOutOfMetaMask);
  setTimeout(() => {
    connectWallet.addEventListener("click", connectWalletwithMetaMask);
  }, 200);
}

// Function to check the wallet balance
async function checkBalance() {
  if (window.userWalletAddress) {
    try {
      const balance = await window.web3.eth.getBalance(
        window.userWalletAddress
      );
      walletBalance.innerText = window.web3.utils.fromWei(balance, "ether");
    } catch (error) {
      console.error("Failed to get wallet balance:", error);
    }
  }
}

// Function to transfer funds
async function transferFunds() {
  const recipientAddress = document.getElementById("recipientAddress").value;
  const transferAmount = document.getElementById("transferAmount").value;

  if (!recipientAddress || !transferAmount) {
    return;
  }

  if (window.userWalletAddress) {
    try {
      const transactionParameters = {
        from: window.userWalletAddress,
        to: recipientAddress,
        value: window.web3.utils.toWei(transferAmount, "ether"),
      };

      const txHash = await window.web3.eth.sendTransaction(
        transactionParameters
      );

      // Display the transaction details in the popup
      popupAmount.innerText = `Amount: ${transferAmount} ETH`;
      popupTxId.innerText = `Transaction ID: ${txHash}`;
      popup.style.display = "block";
    } catch (error) {
      document.getElementById(
        "transferStatus"
      ).innerText = `Error: ${error.message}`;
    }
  } else {
    console.error("Wallet not connected.");
  }
}

// Function to close the popup
function closePopup() {
  popup.style.display = "none";
}

// Event listener when the DOM content is loaded to check if MetaMask is installed
window.addEventListener("DOMContentLoaded", () => {
  connectWallet.addEventListener("click", connectWalletwithMetaMask);
  checkBalance();

  // Add event listeners to the buttons
  document
    .getElementById("checkBalanceBtn")
    .addEventListener("click", checkBalance);
  document
    .getElementById("transferFundsBtn")
    .addEventListener("click", transferFunds);
  document
    .getElementById("closePopupBtn")
    .addEventListener("click", closePopup);
});

// Function to transfer funds
async function transferFunds() {
  const recipientAddress = document.getElementById("recipientAddress").value;
  const transferAmount = document.getElementById("transferAmount").value;

  if (!recipientAddress || !transferAmount) {
    return;
  }

  const transactionParameters = {
    from: window.userWalletAddress,
    to: recipientAddress,
    value: "0x" + parseInt(transferAmount * Math.pow(10, 18)).toString(16),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    // Display the transaction details in the popup
    popupAmount.innerText = `Amount: ${transferAmount}`;
    popupTxId.innerText = `Transaction ID: ${txHash}`;
    popup.style.display = "block";
  } catch (error) {
    document.getElementById(
      "transferStatus"
    ).innerText = `Error: ${error.message}`;
  }
}

function copyTxId() {
  const txId = popupTxId.innerText;
  navigator.clipboard
    .writeText(txId)
    .then(() => {
      alert("Transaction ID copied to clipboard!");
    })
    .catch((error) => {
      console.error("Failed to copy transaction ID:", error);
    });
}
