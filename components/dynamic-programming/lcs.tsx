'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LCSCell {
  value: number;
  arrow: string;
}

const LCS: React.FC = () => {
  const [string1, setString1] = useState<string>('ABCDGH');
  const [string2, setString2] = useState<string>('AEDFHR');
  const [lcsMatrix, setLcsMatrix] = useState<LCSCell[][]>([]);
  const [lcsResult, setLcsResult] = useState<string>('');
  const [highlightedCells, setHighlightedCells] = useState<[number, number][]>([]);

  const computeLCS = () => {
    const m = string1.length;
    const n = string2.length;
    const matrix: LCSCell[][] = Array(m + 1).fill(null).map(() => 
      Array(n + 1).fill(null).map(() => ({ value: 0, arrow: '' }))
    );

    // Fill the matrix
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (string1[i - 1] === string2[j - 1]) {
          matrix[i][j] = { value: matrix[i - 1][j - 1].value + 1, arrow: '↖' };
        } else if (matrix[i - 1][j].value > matrix[i][j - 1].value) {
          matrix[i][j] = { value: matrix[i - 1][j].value, arrow: '↑' };
        } else {
          matrix[i][j] = { value: matrix[i][j - 1].value, arrow: '←' };
        }
      }
    }

    setLcsMatrix(matrix);

    // Backtrack to find LCS
    let i = m, j = n;
    let lcs = '';
    const highlightCells: [number, number][] = [];

    while (i > 0 && j > 0) {
      if (string1[i - 1] === string2[j - 1]) {
        lcs = string1[i - 1] + lcs;
        highlightCells.push([i, j]);
        i--;
        j--;
      } else if (matrix[i - 1][j].value > matrix[i][j - 1].value) {
        i--;
      } else {
        j--;
      }
    }

    setLcsResult(lcs);
    setHighlightedCells(highlightCells.reverse());
  };

  useEffect(() => {
    computeLCS();
  }, [string1, string2]);

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
      className="max-w-4xl mx-auto p-6 text-blue-800"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        Longest Common Subsequence
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="string1">String 1</Label>
            <Input
              id="string1"
              value={string1}
              onChange={(e) => setString1(e.target.value.toUpperCase())}
              placeholder="Enter first string"
            />
          </div>
          <div>
            <Label htmlFor="string2">String 2</Label>
            <Input
              id="string2"
              value={string2}
              onChange={(e) => setString2(e.target.value.toUpperCase())}
              placeholder="Enter second string"
            />
          </div>
        </div>
        <Button onClick={computeLCS} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
          Compute LCS
        </Button>
      </motion.div>

      {lcsMatrix.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <h2 className="text-xl font-semibold mb-2">LCS Matrix</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead className="w-10"></TableHead>
                  {string2.split('').map((char, index) => (
                    <TableHead key={index} className="w-10">{char}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {lcsMatrix.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      {i === 0 ? '' : string1[i - 1]}
                    </TableCell>
                    {row.map((cell, j) => (
                      <TableCell 
                        key={j}
                        className={`w-10 h-10 text-center ${
                          highlightedCells.some(([x, y]) => x === i && y === j) 
                            ? 'bg-green-200' 
                            : ''
                        }`}
                      >
                        {cell.value}
                        <span className="text-xs text-gray-500 ml-1">{cell.arrow}</span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      )}

      {lcsResult && (
        <motion.div 
          variants={itemVariants}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold mb-2">Longest Common Subsequence</h2>
          <p className="text-2xl font-mono bg-blue-100 p-4 rounded">{lcsResult}</p>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-2">How LCS Works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Create a matrix with dimensions (m+1) x (n+1), where m and n are the lengths of the two strings.</li>
          <li>Initialize the first row and column with zeros.</li>
          <li>Iterate through the matrix:</li>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>If the characters match, take the value from the diagonal and add 1.</li>
            <li>If they don't match, take the maximum of the left and top cell.</li>
          </ul>
          <li>The bottom-right cell contains the length of the LCS.</li>
          <li>Backtrack from the bottom-right to construct the LCS:</li>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>If the characters match, include it in the LCS and move diagonally.</li>
            <li>Otherwise, move in the direction of the larger value (up or left).</li>
          </ul>
        </ol>
        <p className="mt-4">
          The highlighted cells in the matrix show the path of the longest common subsequence.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default LCS

