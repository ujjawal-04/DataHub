'use client'

import React, { JSX, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface HuffmanNode {
  char: string;
  freq: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
  code?: string;
}

const defaultTree: HuffmanNode = {
  char: 'Root',
  freq: 100,
  code: '',
  left: {
    char: 'E',
    freq: 60,
    code: '0',
    left: { char: 'I', freq: 25, code: '00' },
    right: { char: 'A', freq: 35, code: '01' }
  },
  right: {
    char: 'T',
    freq: 40,
    code: '1',
    left: { char: 'N', freq: 15, code: '10' },
    right: { char: 'S', freq: 25, code: '11' }
  }
};

const HuffmanCoding: React.FC = () => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [frequencies, setFrequencies] = useState<number[]>([]);
  const [huffmanTree, setHuffmanTree] = useState<HuffmanNode | null>(null);
  const [showDefaultTree, setShowDefaultTree] = useState<boolean>(true);
  const [encodedCharacters, setEncodedCharacters] = useState<{[key: string]: string}>({});

  const addCharacter = () => {
    setCharacters([...characters, '']);
    setFrequencies([...frequencies, 0]);
  };

  const updateCharacter = (index: number, value: string) => {
    const newCharacters = [...characters];
    newCharacters[index] = value;
    setCharacters(newCharacters);
  };

  const updateFrequency = (index: number, value: string) => {
    const newFrequencies = [...frequencies];
    newFrequencies[index] = isNaN(parseInt(value)) ? 0 : parseInt(value);
    setFrequencies(newFrequencies);
  };

  const buildHuffmanTree = (): HuffmanNode => {
    let nodes: HuffmanNode[] = characters.map((char, index) => ({
      char,
      freq: frequencies[index]
    }));

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);
      const left = nodes.shift()!;
      const right = nodes.shift()!;
      const parent: HuffmanNode = {
        char: left.char + right.char,
        freq: left.freq + right.freq,
        left,
        right
      };
      nodes.push(parent);
    }

    return nodes[0];
  };

  const generateCodes = (node: HuffmanNode, code: string = ''): void => {
    if (!node) return;
    node.code = code;
    if (!node.left && !node.right) {
      setEncodedCharacters(prev => ({ ...prev, [node.char]: code }));
    }
    if (node.left) generateCodes(node.left, code + '0');
    if (node.right) generateCodes(node.right, code + '1');
  };

  const handleEncode = () => {
    const tree = buildHuffmanTree();
    generateCodes(tree);
    setHuffmanTree(tree);
    setShowDefaultTree(false);
  };

  const getEncodedText = () => {
    return Object.entries(encodedCharacters)
      .map(([char, code]) => `${char}: ${code}`)
      .join(', ');
  };

  const renderTree = (node: HuffmanNode | null, x: number = 0, y: number = 0, level: number = 0): JSX.Element | null => {
    if (!node) return null;
    
    const nodeSize = 60;
    const horizontalSpacing = 200;
    const verticalSpacing = 120;

    const nodeContent = (
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <circle cx={x} cy={y} r={nodeSize / 2} fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
        <text x={x} y={y - 10} textAnchor="middle" dy=".3em" fill="#1E40AF" fontSize="12">
          {node.char}
        </text>
        <text x={x} y={y + 10} textAnchor="middle" dy=".3em" fill="#1E40AF" fontSize="10">
          Freq: {node.freq}
        </text>
      </motion.g>
    );

    const leftChild = node.left ? renderTree(
      node.left,
      x - horizontalSpacing / (level + 1),
      y + verticalSpacing,
      level + 1
    ) : null;

    const rightChild = node.right ? renderTree(
      node.right,
      x + horizontalSpacing / (level + 1),
      y + verticalSpacing,
      level + 1
    ) : null;

    return (
      <g key={`${node.char}-${node.freq}`}>
        {nodeContent}
        {leftChild && (
          <>
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              x1={x}
              y1={y + nodeSize / 2}
              x2={x - horizontalSpacing / (level + 1)}
              y2={y + verticalSpacing - nodeSize / 2}
              stroke="#3B82F6"
              strokeWidth="2"
            />
            <text
              x={(x + (x - horizontalSpacing / (level + 1))) / 2}
              y={(y + nodeSize / 2 + y + verticalSpacing - nodeSize / 2) / 2}
              textAnchor="middle"
              fill="#059669"
              fontSize="12"
            >
              {node.left?.code}
            </text>
          </>
        )}
        {rightChild && (
          <>
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              x1={x}
              y1={y + nodeSize / 2}
              x2={x + horizontalSpacing / (level + 1)}
              y2={y + verticalSpacing - nodeSize / 2}
              stroke="#3B82F6"
              strokeWidth="2"
            />
            <text
              x={(x + (x + horizontalSpacing / (level + 1))) / 2}
              y={(y + nodeSize / 2 + y + verticalSpacing - nodeSize / 2) / 2}
              textAnchor="middle"
              fill="#059669"
              fontSize="12"
            >
              {node.right?.code}
            </text>
          </>
        )}
        {leftChild}
        {rightChild}
      </g>
    );
  };

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 text-blue-800"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Input Characters and Frequencies</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Character</TableHead>
              <TableHead>Frequency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {characters.map((char, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={char}
                    onChange={(e) => updateCharacter(index, e.target.value)}
                    maxLength={1}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={frequencies[index] || ''}
                    onChange={(e) => updateFrequency(index, e.target.value)}
                    min={0}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-2 flex justify-between">
          <Button onClick={addCharacter} className="bg-blue-600 hover:bg-blue-700 text-white">
            Add Character
          </Button>
          <Button onClick={handleEncode} className="bg-green-600 hover:bg-green-700 text-white">
            Build Huffman Tree
          </Button>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Huffman Tree</h2>
          <div className="flex items-center space-x-2">
            <Label htmlFor="show-default">Show Default Tree</Label>
            <Switch
              id="show-default"
              checked={showDefaultTree}
              onCheckedChange={setShowDefaultTree}
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto" style={{ height: '600px' }}>
          <svg width="100%" height="100%" viewBox="0 0 1000 600">
            <g transform="translate(500, 50)">
              {renderTree(showDefaultTree ? defaultTree : huffmanTree)}
            </g>
          </svg>
        </div>
      </motion.div>

      {!showDefaultTree && Object.keys(encodedCharacters).length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <h2 className="text-xl font-semibold mb-2">Encoded Characters</h2>
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <p className="font-mono break-all">{getEncodedText()}</p>
          </div>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-2">How Huffman Coding Works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Input the characters and their frequencies.</li>
          <li>Create a leaf node for each character and add it to a priority queue.</li>
          <li>While there is more than one node in the queue:</li>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Remove the two nodes with the lowest frequency.</li>
            <li>Create a new internal node with these two nodes as children.</li>
            <li>Add the new node back to the queue.</li>
          </ul>
          <li>The remaining node is the root of the Huffman tree.</li>
          <li>Traverse the tree, assigning '0' for left branches and '1' for right branches.</li>
          <li>The resulting codes for each character form the Huffman encoding.</li>
        </ol>
        <p className="mt-4">
          Huffman coding creates shorter codes for more frequent characters, resulting in efficient data compression.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default HuffmanCoding

