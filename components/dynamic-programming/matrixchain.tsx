'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

interface Matrix {
  rows: number;
  cols: number;
}

const MatrixChain: React.FC = () => {
  const [matrices, setMatrices] = useState<Matrix[]>([
    { rows: 30, cols: 35 },
    { rows: 35, cols: 15 },
    { rows: 15, cols: 5 },
    { rows: 5, cols: 10 },
    { rows: 10, cols: 20 },
    { rows: 20, cols: 25 }
  ]);
  const [dpTable, setDpTable] = useState<number[][]>([]);
  const [optimalOrder, setOptimalOrder] = useState<string>('');

  const addMatrix = () => {
    const lastMatrix = matrices[matrices.length - 1];
    setMatrices([...matrices, { rows: lastMatrix.cols, cols: 0 }]);
  };

  const updateMatrix = (index: number, field: 'rows' | 'cols', value: string) => {
    const newMatrices = [...matrices];
    newMatrices[index][field] = parseInt(value) || 0;
    if (index < matrices.length - 1 && field === 'cols') {
      newMatrices[index + 1].rows = newMatrices[index].cols;
    }
    setMatrices(newMatrices);
  };

  const removeMatrix = (index: number) => {
    if (matrices.length > 2) {
      const newMatrices = matrices.filter((_, i) => i !== index);
      if (index < matrices.length - 1) {
        newMatrices[index].rows = newMatrices[index - 1].cols;
      }
      setMatrices(newMatrices);
    }
  };

  const matrixChainOrder = useCallback(() => {
    const printOptimalParens = (s: number[][], i: number, j: number): string => {
      if (i === j) {
        return `A${i + 1}`;
      } else {
        return `(${printOptimalParens(s, i, s[i][j])} ${printOptimalParens(s, s[i][j] + 1, j)})`;
      }
    };

    const n = matrices.length;
    const m: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
    const s: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));

    for (let len = 2; len <= n; len++) {
      for (let i = 0; i < n - len + 1; i++) {
        const j = i + len - 1;
        m[i][j] = Infinity;
        for (let k = i; k < j; k++) {
          const q = m[i][k] + m[k + 1][j] + matrices[i].rows * matrices[k].cols * matrices[j].cols;
          if (q < m[i][j]) {
            m[i][j] = q;
            s[i][j] = k;
          }
        }
      }
    }

    setDpTable(m);
    const order = printOptimalParens(s, 0, n - 1);
    setOptimalOrder(order);
  }, [matrices]);

  useEffect(() => {
    matrixChainOrder();
  }, [matrixChainOrder]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-2 sm:p-6 text-blue-800"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Matrices</h2>
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matrix</TableHead>
                <TableHead>Rows</TableHead>
                <TableHead>Columns</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matrices.map((matrix, index) => (
                <TableRow key={index}>
                  <TableCell>A{index + 1}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={matrix.rows}
                      onChange={(e) => updateMatrix(index, 'rows', e.target.value)}
                      min={1}
                      disabled={index > 0}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={matrix.cols}
                      onChange={(e) => updateMatrix(index, 'cols', e.target.value)}
                      min={1}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => removeMatrix(index)} variant="destructive" disabled={matrices.length <= 2} className="w-full sm:w-auto">Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <Button onClick={addMatrix} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">Add Matrix</Button>
      </motion.div>

      <motion.div variants={containerVariants} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Dynamic Programming Table</h2>
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>i\j</TableHead>
                    {matrices.map((_, index) => (
                      <TableHead key={index}>{index + 1}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dpTable.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      {row.map((cell, j) => (
                        <TableCell key={j}>
                          {cell === Infinity ? '∞' : cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Optimal Parenthesization</h2>
        <ScrollArea className="w-full max-h-24">
          <p className="text-lg sm:text-2xl font-mono bg-blue-100 p-4 rounded whitespace-nowrap">
            {optimalOrder}
          </p>
        </ScrollArea>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-blue-50 p-4 rounded-lg text-sm sm:text-base"
      >
        <h2 className="text-xl font-semibold mb-2">How Matrix Chain Multiplication Works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Create a table where both rows and columns represent the matrices.</li>
          <li>The diagonal elements are initialized to 0 (cost of multiplying a matrix by itself).</li>
          <li>Fill the table diagonally upwards:</li>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>For each cell (i, j), try all possible ways to split the chain between i and j.</li>
            <li>Calculate the cost as: m[i][k] + m[k+1][j] + (rows of i) * (cols of k) * (cols of j)</li>
            <li>Choose the minimum cost and store it in m[i][j].</li>
          </ul>
          <li>The top-right cell contains the minimum number of scalar multiplications needed.</li>
          <li>Use a separate table to keep track of where the optimal splits occur.</li>
          <li>Backtrack through this table to determine the optimal parenthesization.</li>
        </ol>
        <p className="mt-4">
          The table shows the minimum number of scalar multiplications needed for each subchain.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default MatrixChain;

