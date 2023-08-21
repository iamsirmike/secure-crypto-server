const express = require("express");
const app = express();
const cors = require("cors");
const { validateTx } = require("./utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xb4195d6cec8307c2": 1020,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = getOwnerBalance(address);
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { meta, ...tx } = req.body;

  setInitialBalance(tx.sender);
  setInitialBalance(tx.recipient);

  const { valid, address } = validateTx(tx, meta.signature, meta.publicKey);

  if (!valid || address !== tx.sender) {
    res.status(400).send({ message: "Invalid signature!" });
  } else if (balances[tx.sender] < tx.amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[tx.sender] -= tx.amount;
    balances[tx.recipient] += tx.amount;
    res.send({ balance: balances[tx.sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function getOwnerBalance(address) {
  return balances[address] || 0;
}
