const fs = require("fs");
const path = require("path");
const { parse, format } = require("fast-csv");

try {
  var args = process.argv.slice(2);
  let rows = [];

  fs.createReadStream(path.resolve(__dirname, args[0]))
    .pipe(parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      var duplicate = false;
      var indexToBeUpdated = -1;
      var toBeAddedLoan = 0;

      rows.map((list, index) => {
        if (row.giver == list.giver && row.taker == list.taker) {
          duplicate = true;
          indexToBeUpdated = index;
          toBeAddedLoan = row.loan;
        }
      });

      if (!duplicate) {
        rows.push(row);
      } else {
        rows[indexToBeUpdated] = {
          taker: rows[indexToBeUpdated].taker,
          giver: rows[indexToBeUpdated].giver,
          loan: (
            parseInt(rows[indexToBeUpdated].loan) + parseInt(toBeAddedLoan)
          ).toString(),
        };
      }
    })
    .on("end", (rowCount) => {
      console.log(`Parsed ${rowCount} rows`);

      csvFile = fs.createWriteStream("result.csv");
      const stream = format({ headers: true });
      stream.pipe(csvFile);

      rows.map((list) => {
        stream.write(list);
      });
      stream.end();
    });
} catch (error) {
  console.log(error);
}
