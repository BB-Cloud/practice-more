/*
 * @Author: your name
 * @Date: 2020-07-09 19:06:12
 * @LastEditTime: 2020-07-09 19:11:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /practice-more/2020/nodejs/race-new.js
 */ 
const chalkWorker = require('chalk-animation')

class Race {
  constructor(props = {}) {
    [
      ['rabbit', '🐰'],
      ['turtle', '🐢'],
      ['turtleStep', 0],
      ['rabbitStep', 0],
      ['start', '|'],
      ['end', '》'],
      ['pad', '.'],
      ['speed', 1],
      ['steps', 50],
      ['stopAt', 35]
    ].forEach(elem => {
      const [key, value] = elem
      if (!(key in props)) {
        this[key] = value
      }
    })
  }

  getRaceTrack () {
    const {
      start,
      pad,
      turtle,
      turtleStep,
      rabbit,
      rabbitStep,
      steps,
      end
    } = this

    if (!turtleStep && !rabbitStep) {
      return `${turtle}${rabbit}${start}${pad.repeat(steps)}${end}`
    }

    const [
      [minStr, min],
      [maxStr, max]
    ] = [
      [turtle, turtleStep],
      [rabbit, rabbitStep]
    ].sort((a, b) => a[1] - b[1])

    const prefix = `${pad.repeat((min || 1) - 1)}`
    const middle = `${pad.repeat(max - min)}`
    const suffix = `${pad.repeat(steps - max)}`

    const _start = `${start}${prefix}${minStr}`
    const _end = suffix ? `${maxStr}${suffix}${end}` : `${end}${maxStr}`
    return `${_start}${middle}${_end}`
  }

  updateRaceTrack (state, racing) {
    racing.replace(state)
  }

  updateSteps () {
    if (this.turtleStep >= this.steps) return
    if (this.rabbitStep <= this.stopAt) {
      this.rabbitStep += 3 * this.speed
    }
    this.turtleStep += 1 * this.speed
  }

  race () {
    const initState = this.getRaceTrack()
    const racing = chalkWorker.rainbow(initState)
    let t = 0
    let timer = setInterval(() => {
      if (t <= 6) {
        t += 1
        return
      }
      const state = this.getRaceTrack()
      this.updateRaceTrack(state, racing)
      this.updateSteps()
    }, 100)
  }
}


const race = new Race()
race.race() 