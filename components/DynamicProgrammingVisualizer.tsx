'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MatrixChainResult {
  m: number[][]
  s: number[][]
}

const DynamicProgrammingVisualizer = () => {
  const [lcsString1, setLcsString1] = useState('ABCDGH')
  const [lcsString2, setLcsString2] = useState('AEDFHR')
  const [lcsResult, setLcsResult] = useState<string[][]>([])

  const [matrixDimensions, setMatrixDimensions] = useState('30,35,15,5,10,20,25')
  const [matrixChainResult, setMatrixChainResult] = useState<MatrixChainResult | null>(null)

  const [knapsackItems, setKnapsackItems] = useState([
    { weight: 10, value: 60 },
    { weight: 20, value: 100 },
    { weight: 30, value: 120 },
  ])
  const [knapsackCapacity, setKnapsackCapacity] = useState(50)
  const [knapsackResult, setKnapsackResult] = useState<number[][]>([])

  useEffect(() => {
    calculateLCS()
    calculateMatrixChainMultiplication()
    calculate01Knapsack()
  }, [lcsString1, lcsString2, matrixDimensions, knapsackItems, knapsackCapacity])

  const calculateLCS = () => {
    const m = lcsString1.length
    const n = lcsString2.length
    const L: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))
    const result: string[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(''))

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0 || j === 0) {
          L[i][j] = 0
        } else if (lcsString1[i - 1] === lcsString2[j - 1]) {
          L[i][j] = L[i - 1][j - 1] + 1
          result[i][j] = result[i - 1][j - 1] + lcsString1[i - 1]
        } else {
          L[i][j] = Math.max(L[i - 1][j], L[i][j - 1])
          result[i][j] = L[i - 1][j] > L[i][j - 1] ? result[i - 1][j] : result[i][j - 1]
        }
      }
    }

    setLcsResult(result)
  }

  const calculateMatrixChainMultiplication = () => {
    const dimensions = matrixDimensions.split(',').map(Number)
    const n = dimensions.length - 1
    const m: number[][] = Array(n).fill(null).map(() => Array(n).fill(0))
    const s: number[][] = Array(n).fill(null).map(() => Array(n).fill(0))

    for (let l = 2; l <= n; l++) {
      for (let i = 0; i < n - l + 1; i++) {
        const j = i + l - 1
        m[i][j] = Infinity
        for (let k = i; k < j; k++) {
          const q = m[i][k] + m[k + 1][j] + dimensions[i] * dimensions[k + 1] * dimensions[j + 1]
          if (q < m[i][j]) {
            m[i][j] = q
            s[i][j] = k
          }
        }
      }
    }

    setMatrixChainResult({ m, s })
  }

  const calculate01Knapsack = () => {
    const n = knapsackItems.length
    const W = knapsackCapacity
    const K: number[][] = Array(n + 1).fill(null).map(() => Array(W + 1).fill(0))

    for (let i = 0; i <= n; i++) {
      for (let w = 0; w <= W; w++) {
        if (i === 0 || w === 0) {
          K[i][w] = 0
        } else if (knapsackItems[i - 1].weight <= w) {
          K[i][w] = Math.max(
            knapsackItems[i - 1].value + K[i - 1][w - knapsackItems[i - 1].weight],
            K[i - 1][w]
          )
        } else {
          K[i][w] = K[i - 1][w]
        }
      }
    }

    setKnapsackResult(K)
  }

  return (
    <div className="tech-card">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Dynamic Programming Visualizer</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Longest Common Subsequence (LCS)</h3>
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="text"
            value={lcsString1}
            onChange={(e) => setLcsString1(e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Enter first string"
          />
          <input
            type="text"
            value={lcsString2}
            onChange={(e) => setLcsString2(e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Enter second string"
          />
        </div>
        <div className="algo-canvas overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="border p-2"></th>
                <th className="border p-2"></th>
                {lcsString2.split('').map((char, index) => (
                  <th key={index} className="border p-2">{char}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lcsResult.map((row, i) => (
                <tr key={i}>
                  <th className="border p-2">{i === 0 ? '' : lcsString1[i - 1]}</th>
                  {row.map((cell, j) => (
                    <td key={j} className="border p-2">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: (i + j) * 0.05 }}
                      >
                        {cell}
                      </motion.div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Matrix Chain Multiplication</h3>
        <div className="mb-4">
          <input
            type="text"
            value={matrixDimensions}
            onChange={(e) => setMatrixDimensions(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            placeholder="Enter matrix dimensions (comma-separated)"
          />
        </div>
        {matrixChainResult && (
          <div className="algo-canvas overflow-x-auto">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">i\j</th>
                  {matrixChainResult.m[0].map((_, index) => (
                    <th key={index} className="border p-2">{index}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixChainResult.m.map((row, i) => (
                  <tr key={i}>
                    <th className="border p-2">{i}</th>
                    {row.map((cell, j) => (
                      <td key={j} className="border p-2">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: (i + j) * 0.05 }}
                        >
                          {cell !== Infinity ? cell : '-'}
                        </motion.div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">0-1 Knapsack</h3>
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="number"
            value={knapsackCapacity}
            onChange={(e) => setKnapsackCapacity(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
            placeholder="Enter knapsack capacity"
          />
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Items:</h4>
          {knapsackItems.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="number"
                value={item.weight}
                onChange={(e) => {
                  const newItems = [...knapsackItems]
                  newItems[index].weight = parseInt(e.target.value)
                  setKnapsackItems(newItems)
                }}
                className="border rounded px-2 py-1 w-20"
                placeholder="Weight"
              />
              <input
                type="number"
                value={item.value}
                onChange={(e) => {
                  const newItems = [...knapsackItems]
                  newItems[index].value = parseInt(e.target.value)
                  setKnapsackItems(newItems)
                }}
                className="border rounded px-2 py-1 w-20"
                placeholder="Value"
              />
            </div>
          ))}
          <button
            onClick={() => setKnapsackItems([...knapsackItems, { weight: 0, value: 0 }])}
            className="btn-secondary"
          >
            Add Item
          </button>
        </div>
        <div className="algo-canvas overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="border p-2">i\w</th>
                {knapsackResult[0]?.map((_, index) => (
                  <th key={index} className="border p-2">{index}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {knapsackResult.map((row, i) => (
                <tr key={i}>
                  <th className="border p-2">{i}</th>
                  {row.map((cell, j) => (
                    <td key={j} className="border p-2">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: (i + j) * 0.05 }}
                      >
                        {cell}
                      </motion.div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DynamicProgrammingVisualizer

