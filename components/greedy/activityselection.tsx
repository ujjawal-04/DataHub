'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ActivitySelection: React.FC = () => {
  const [activities, setActivities] = useState<number[][]>([
    [1, 4],
    [3, 5],
    [0, 6],
    [5, 7],
    [3, 8],
    [5, 9],
    [6, 10],
    [8, 11],
    [8, 12],
    [2, 13]
  ])
  const [newStart, setNewStart] = useState<number>(0)
  const [newFinish, setNewFinish] = useState<number>(0)
  const [selectedActivities, setSelectedActivities] = useState<number[][]>([])

  const selectActivities = () => {
    const sortedActivities = [...activities].sort((a, b) => a[1] - b[1])
    const selected: number[][] = []

    if (sortedActivities.length > 0) {
      selected.push(sortedActivities[0])
      let lastFinishTime = sortedActivities[0][1]

      for (let i = 1; i < sortedActivities.length; i++) {
        if (sortedActivities[i][0] >= lastFinishTime) {
          selected.push(sortedActivities[i])
          lastFinishTime = sortedActivities[i][1]
        }
      }
    }

    setSelectedActivities(selected)
  }

  const addActivity = () => {
    if (newStart < newFinish) {
      setActivities([...activities, [newStart, newFinish]])
      setNewStart(0)
      setNewFinish(0)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  const barVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 text-blue-800"
    >
      <motion.div 
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Add New Activity</h2>
        <div className="flex gap-4 mb-2">
          <div>
            <Label htmlFor="start">Start Time</Label>
            <Input
              id="start"
              type="number"
              value={newStart}
              onChange={(e) => setNewStart(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="finish">Finish Time</Label>
            <Input
              id="finish"
              type="number"
              value={newFinish}
              onChange={(e) => setNewFinish(Number(e.target.value))}
              min="0"
            />
          </div>
        </div>
        <Button onClick={addActivity} className="bg-blue-600 hover:bg-blue-700 text-white">Add Activity</Button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">All Activities</h2>
        <ul className="space-y-2">
          <AnimatePresence>
            {activities.map((activity, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="bg-blue-100 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-blue-400"
                  style={{ width: `${(activity[1] - activity[0]) / 0.13}%` }}
                  variants={barVariants}
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex justify-between items-center"
                >
                  <span className="font-semibold">Activity {index + 1}</span>
                  <span className="text-blue-600">Duration: {activity[1] - activity[0]}</span>
                </motion.div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-2 flex justify-between"
                >
                  <span>Start: {activity[0]}</span>
                  <span>Finish: {activity[1]}</span>
                </motion.div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>

      <Button 
        onClick={selectActivities} 
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Select Activities
      </Button>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Selected Activities</h2>
        <ul className="space-y-2">
          <AnimatePresence>
            {selectedActivities.map((activity, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: 20 }}
                className="bg-blue-200 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-blue-600"
                  style={{ width: `${(activity[1] - activity[0]) / 0.13}%` }}
                  variants={barVariants}
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex justify-between items-center"
                >
                  <span className="font-semibold">Selected Activity {index + 1}</span>
                  <span className="text-blue-700">Duration: {activity[1] - activity[0]}</span>
                </motion.div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-2 flex justify-between"
                >
                  <span>Start: {activity[0]}</span>
                  <span>Finish: {activity[1]}</span>
                </motion.div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-2">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Sort all activities in ascending order by their finish time.</li>
          <li>Select the first activity (with the earliest finish time).</li>
          <li>For the remaining activities, select an activity if its start time is greater than or equal to the finish time of the previously selected activity.</li>
          <li>Repeat step 3 until all activities have been considered.</li>
          <li>The selected activities represent the maximum number of non-overlapping activities.</li>
        </ol>
      </motion.div>
    </motion.div>
  )
}

export default ActivitySelection

