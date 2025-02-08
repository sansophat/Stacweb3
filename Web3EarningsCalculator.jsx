import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Web3EarningsCalculator = () => {
  const [investment, setInvestment] = useState(0);
  const [days, setDays] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [results, setResults] = useState([]);
  const [roi, setRoi] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [minProfit, setMinProfit] = useState(0);
  const [maxProfit, setMaxProfit] = useState(0);

  const calculateEarnings = () => {
    let amount = parseFloat(investment);
    let dailyRate = parseFloat(percentage) / 100;
    let data = [];
    let totalProfit = 0;
    let currentDate = new Date(startDate);
    let minDailyProfit = Infinity;
    let maxDailyProfit = -Infinity;

    for (let i = 1; i <= days; i++) {
      let profit = amount * dailyRate;
      totalProfit += profit;
      let tradeAmount = amount;
      amount += profit; // Compound earnings

      minDailyProfit = Math.min(minDailyProfit, profit);
      maxDailyProfit = Math.max(maxDailyProfit, profit);

      data.push({
        day: i,
        date: currentDate.toISOString().split("T")[0],
        tradeAmount: tradeAmount.toFixed(2),
        profit: profit.toFixed(2),
        balance: amount.toFixed(2),
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setResults(data);
    setRoi(totalProfit.toFixed(2));
    setFinalBalance(amount.toFixed(2));
    setMinProfit(minDailyProfit.toFixed(2));
    setMaxProfit(maxDailyProfit.toFixed(2));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">គណនាលទ្ធផល Web3</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="ចំនួនទុន" 
              onChange={(e) => setInvestment(e.target.value)}
            />
            <Input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="number"
              placeholder="ចំនួនថ្ងៃ"
              onChange={(e) => setDays(e.target.value)}
            />
            <Input
              type="number"
              placeholder="ភាគរយប្រចាំថ្ងៃ"
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>
          <Button className="mt-4 w-full" onClick={calculateEarnings}>
            គណនា
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">បញ្ជីលទ្ធផល</h2>
            <div className="mb-4 text-lg font-bold">
              ចំនួនទុនសរុប: ${investment} | ចំនួនប្រាក់ចំណេញសរុប: ${roi} | ប្រាក់សរុប: ${finalBalance}
            </div>
            <div className="mb-4 text-lg font-bold">
              ចំណេញអប្បបរមា: ${minProfit} | ចំណេញអតិបរមា: ${maxProfit}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ថ្ងៃ</TableHead>
                  <TableHead>កាលបរិច្ឆេទ</TableHead>
                  <TableHead>ចំនួនទុន</TableHead>
                  <TableHead>ប្រាក់ចំណេញ</TableHead>
                  <TableHead>សមតុល្យ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.day}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>${row.tradeAmount}</TableCell>
                    <TableCell>${row.profit}</TableCell>
                    <TableCell>${row.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Web3EarningsCalculator;
