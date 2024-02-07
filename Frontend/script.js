document.addEventListener("DOMContentLoaded", function () {
  const generateScannerCard = document.getElementById("generate-scanner");
  const requestMoneyCard = document.getElementById("request-money");
  const moneyTransferCard = document.getElementById("money-transfer");
  const qrPopup = document.getElementById("qr-popup");
  const requestMoneyPopup = document.getElementById("request-money-popup");
  const moneyTransferPopup = document.getElementById("money-transfer-popup");

  generateScannerCard.addEventListener("click", function () {
    qrPopup.style.display = "block";
  });

  requestMoneyCard.addEventListener("click", function () {
    requestMoneyPopup.style.display = "block";
  });

  moneyTransferCard.addEventListener("click", function () {
    moneyTransferPopup.style.display = "block";
  });

  const closeButtons = document.getElementsByClassName("close");
  for (const closeButton of closeButtons) {
    closeButton.addEventListener("click", function () {
      qrPopup.style.display = "none";
      requestMoneyPopup.style.display = "none";
      moneyTransferPopup.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (
      event.target === qrPopup ||
      event.target === requestMoneyPopup ||
      event.target === moneyTransferPopup
    ) {
      qrPopup.style.display = "none";
      requestMoneyPopup.style.display = "none";
      moneyTransferPopup.style.display = "none";
    }
  });

  // Additional JavaScript functionalities can be added here
});
let web3;

document
  .getElementById("walletActionBtn")
  .addEventListener("click", async () => {
    try {
      if (!web3) {
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          const walletAddress = accounts[0];
          document.getElementById(
            "walletAddress"
          ).textContent = `Wallet Address: ${walletAddress}`;
          document.getElementById("walletActionBtn").textContent = "Sign Out";
          document.getElementById("checkBalanceBtn").disabled = false;
        } else {
          console.error("MetaMask not detected.");
        }
      } else {
        web3 = null;
        document.getElementById("walletAddress").textContent = "";
        document.getElementById("walletActionBtn").textContent =
          "Connect Wallet";
        document.getElementById("checkBalanceBtn").disabled = true;
      }
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  });

document
  .getElementById("checkBalanceBtn")
  .addEventListener("click", async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];
      const balance = await web3.eth.getBalance(walletAddress);
      const balanceInEther = web3.utils.fromWei(balance, "ether");
      document.getElementById(
        "walletBalance"
      ).textContent = `Wallet Balance: ${balanceInEther} ETH`;
    } catch (error) {
      console.error("Failed to get wallet balance:", error);
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  // Existing code remains unchanged

  // Add event listener for the "Transactions" card
  const transactionsCard = document.getElementById("transactions");
  const ethereumTransactionsPopup = document.getElementById(
    "ethereum-transactions-popup"
  );

  transactionsCard.addEventListener("click", async function () {
    ethereumTransactionsPopup.style.display = "block";

    // Dummy transactions data with timestamps
    const dummyTransactions = [
      { hash: "0x5c5ey3...", value: "10", timestamp: "2024-02-10T17:20:00Z" },
      { hash: "0xabc123...", value: "0.5", timestamp: "2024-02-10T10:30:00Z" },
      { hash: "0xdef456...", value: "1.2", timestamp: "2024-02-10T11:15:00Z" },
      { hash: "0xghi789...", value: "0.8", timestamp: "2024-02-10T12:00:00Z" },
      { hash: "0xjkl012...", value: "2.3", timestamp: "2024-02-10T13:45:00Z" },
    ];

    const transactionsContainer = document.getElementById(
      "ethereum-transactions"
    );
    transactionsContainer.innerHTML = ""; // Clear previous transactions

    dummyTransactions.forEach((transaction) => {
      const transactionElement = document.createElement("div");
      transactionElement.classList.add("transaction");

      const transactionHash = document.createElement("p");
      transactionHash.textContent = `Transaction Hash: ${transaction.hash}`;

      const transactionAmount = document.createElement("p");
      transactionAmount.textContent = `Amount: ${transaction.value} ETH`; // Assuming values are in ETH

      const transactionTimestamp = document.createElement("p");
      const timestamp = new Date(transaction.timestamp).toLocaleString(); // Format timestamp
      transactionTimestamp.textContent = `Timestamp: ${timestamp}`;

      transactionElement.appendChild(transactionHash);
      transactionElement.appendChild(transactionAmount);
      transactionElement.appendChild(transactionTimestamp); // Add timestamp to transaction

      transactionsContainer.appendChild(transactionElement);
    });
  });

  // Close popup functionality
  const closeButtons = document.querySelectorAll(
    "#ethereum-transactions-popup .close"
  );
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", function () {
      ethereumTransactionsPopup.style.display = "none";
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === ethereumTransactionsPopup) {
      ethereumTransactionsPopup.style.display = "none";
    }
  });

  // Existing code remains unchanged
});

//transfer css

document.addEventListener("DOMContentLoaded", function () {
  // Existing code remains unchanged

  // Add event listener for the "Saved Contacts" card
  const contactsTrigger = document.getElementById("contacts-trigger");
  const contactsListPopup = document.getElementById("contacts-list-popup");

  contactsTrigger.addEventListener("click", function () {
    contactsListPopup.style.display = "block";

    // Dummy contacts data
    const dummyContacts = [
      {
        name: "John Cybester ",
        address: "0x123abc...",
        image:
          "https://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png",
      },
      {
        name: "Joseph Farnendes",
        address: "0x456def...",
        image:
          "https://png.pngitem.com/pimgs/s/75-758282_walter-circle-person-photo-in-circle-hd-png.png",
      },
      {
        name: "Ramesh Joseph",
        address: "0x789ghi...",
        image:
          "https://www.pngfind.com/pngs/m/218-2184178_shah-chirayu-round-01-gentleman-hd-png-download.png",
      },
    ];

    const contactsList = document.getElementById("contacts-list");
    contactsList.innerHTML = ""; // Clear previous contacts

    dummyContacts.forEach((contact) => {
      const contactElement = document.createElement("div");
      contactElement.classList.add("contact");

      // Create image element
      const img = document.createElement("img");
      img.src = contact.image;
      img.alt = contact.name;

      // Create paragraph element for contact info
      const info = document.createElement("p");
      info.textContent = `${contact.name} (${contact.address})`;

      // Append image and info to contact element
      contactElement.appendChild(img);
      contactElement.appendChild(info);

      // Add click event listener to open message interface
      contactElement.addEventListener("click", function () {
        openMessageInterface(contact.name);
      });

      // Append contact element to contacts list
      contactsList.appendChild(contactElement);
    });
  });

  // Function to open message interface
  function openMessageInterface(contactName) {
    // Add your logic to open the message interface for the selected contact
    console.log("Opening message interface for:", contactName);
  }

  // Close popup functionality
  const closeButtons = document.querySelectorAll("#contacts-list-popup .close");
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", function () {
      contactsListPopup.style.display = "none";
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === contactsListPopup) {
      contactsListPopup.style.display = "none";
    }
  });

  // Remaining code remains unchanged
});
