const fs = require("fs");
const { format } = require("fast-csv");

const names = [
  "Ram",
  "Hari",
  "Shyam",
  "Gokul",
  "Neon",
  "Ramita",
  "Roy",
  "Milan",
  "Joy",
];

try {
  csvFile = fs.createWriteStream("test.csv");
  const stream = format({ headers: true });
  stream.pipe(csvFile);

  const twoRandomNumber = () => {
    const random1 = Math.floor(Math.random() * 9);
    const random2 = Math.floor(Math.random() * 9);

    if (random1 !== random2) {
      return [random1, random2];
    } else {
      twoRandomNumber();
    }
  };

  for (var i = 0; i < 100000; i++) {
    const randomNumbers = twoRandomNumber();
    if (randomNumbers) {
      stream.write({
        taker: names[randomNumbers[0]],
        giver: names[randomNumbers[1]],
        loan: Math.floor(Math.random() * 1000),
      });
    }
  }

  stream.end();
  console.log("CSV file of name test.csv generate or overwitten");
} catch (error) {
  console.log(error);
}
