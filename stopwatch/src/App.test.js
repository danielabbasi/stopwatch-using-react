import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Stopwatch, { reducer } from './Stopwatch'


describe('Timer', () => {
  let previoustate
  let newState
  
  describe('when initialised', () => {

    beforeEach(() => {
      previoustate = {
        isRunning: false,
        timeElapsed: 0,
        currentTime: 0,
        lapTimes: []
      }
    })

    describe('and START_STOP is triggered', () => {
      beforeEach(() => {
        newState = reducer(previoustate, 'START_STOP')
      })

      it('isRunning should be set to true', () => {
        expect(newState.isRunning).toBe(true)
      })

      it('laps should be empty', () => {
        expect(newState.lapTimes).toHaveLength(0)
      })
    })

    describe('and LAP_RESET is triggered', () =>{
      beforeEach(() => {
        newState = reducer(previoustate, 'LAP_RESET')
      })

      it('isRunning should be set to false', () => {
        expect(newState.isRunning).toBe(false)
      })

      it('laps should be empty', () => {
        expect(newState.lapTimes).toHaveLength(0)
      })
    })
  })

  describe('When the timer is running', ()=>{
    beforeEach(() => {
      previoustate = {
        isRunning: true,
        timeElapsed: 500,
        currentTime: 0,
        lapTimes: [] 
      }
    })
    
    describe('and START_STOP is triggered', () => {
      beforeEach(() => {
        newState = reducer(previoustate, 'START_STOP')
      })
      it('isRunning should be set to false', () => {
        expect(newState.isRunning).toBe(false)
      })
    })

    describe('and LAP_RESET is triggered', () => {
      beforeEach(() => {
        newState = reducer(previoustate, 'LAP_RESET')
      })
      it('lapTimes is populated with one element', () => {
        expect(newState.lapTimes).toHaveLength(1)  
      })
    })
  })
})



