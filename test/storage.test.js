import {expect} from 'chai'
import typecheck from '@konata9/typecheck.js'
import Storage from './../index'
import * as ParamsCheck from '../src/paramsCheck.js'

describe('Params check test', () => {
  describe('Storage type check', () => {
    it('Type null check', () => expect(() => ParamsCheck.storageTypeCheck()).to.throw(ReferenceError, 'Type can\'t be null'))
    it('Type error check', () => expect(() => ParamsCheck.storageTypeCheck([])).to.throw(TypeError, 'Type require param type: string'))
    it('Type value check', () => expect(() => ParamsCheck.storageTypeCheck('abc')).to.throw(ReferenceError, 'Type must be local or session'))
  })

  describe('ObjParams type check', () => {
    it('Type null check', () => expect(() => ParamsCheck.objectParamsCheck('insertItem')).to.throw(ReferenceError, 'insertItem can\'t be null'))
    it('Type error check', () => expect(() => ParamsCheck.objectParamsCheck('insertItem', [])).to.throw(TypeError, 'insertItem require param type: object'))
  })

  describe('StringParams type check', () => {
    it('Type null check', () => expect(() => ParamsCheck.stringParamsCheck('Key')).to.throw(ReferenceError, 'Key can\'t be null'))
    it('Type error check', () => expect(() => ParamsCheck.stringParamsCheck('Key', 1)).to.throw(TypeError, 'Key require param type: string'))
  })
})

describe('Storage default value check', () => {
  it('Type check Object', () => expect(typecheck(Storage)).to.be.equal('object'))
  it('Default type: session', () => expect(Storage.getType()).to.be.equal('session'))
  it('Set type: local', () => {
    Storage.setType('local')
    return expect(Storage.getType()).to.be.equal('local')
  })
  it('Set type: session', () => {
    Storage.setType('session')
    return expect(Storage.getType()).to.be.equal('session')
  })
})

describe('Const check', () => {
  it('Storage inner const ONE_MINUTE check', () => expect(Storage.ONE_MINUTE).to.be.equal(1000 * 60))
  it('Storage inner const ONE_HOUR check', () => expect(Storage.ONE_HOUR).to.be.equal(1000 * 60 * 60))
  it('Storage inner const ONE_DAY check', () => expect(Storage.ONE_DAY).to.be.equal(1000 * 60 * 60 * 24))
  it('Storage inner const ONE_MONTH check', () => expect(Storage.ONE_MONTH).to.be.equal(1000 * 60 * 60 * 24 * 30))
})

describe('Function Test:', () => {
  describe('Get and Set check', () => {
    // function check
    it('Storage multiple set and get', () => {
      Storage.set({a: 1, b: 2, c: 3})
      return expect(Storage.get(['a', 'b', 'c'])).to.be.eql([1, 2, 3])
    })
    it('Storage single set and get', () => {
      Storage.set({d: [1, 2]})
      return expect(Storage.get('d')).to.be.eql([1, 2])
    })
  })

  describe('Expired function check', () => {
    it('Storage set single expires key', () => {
      Storage.setExpireKey({e: 'ee'}, {type: 'local'})
      return expect(Storage.get('--e--', 'local')).to.not.equal(null)
    })
    it('Storage check unexpired key: e', () => expect(Storage.checkExpired('e', 'local')).to.be.equal(false))
    it('Storage set multiple expired keys: f', () => {
      Storage.setExpireKey({
        'f': 1,
        'g': 2,
        'h': 3
      })
      return expect(Storage.get(['f', 'g', 'h'])).to.eql([1, 2, 3])
    })
    it('Storage check expired no key', () => expect(Storage.checkExpired('a')).to.be.equal(null))
    it('Check expired keys: i', () => {
      Storage.setExpireKey({
        i: [],
        j: {},
        k: '2'
      }, {expires: -1 * Storage.ONE_DAY})
      return expect(Storage.checkExpired('i')).to.be.equal(true)
    })
    it('Storage get expired multiple keys: i, j, k', () =>
      expect(Storage.get(['a', 'i', 'j', 'k', 'c'])).to.eql([1, null, null, null, 3]))
  })

  describe('List and Has', () => {
    it('Storage list keys not full', () => expect(Storage.listKeys()).to.eql(['a', 'b', 'c', 'd', 'f', 'g', 'h']))
    it('Storage list keys not full by type', () => expect(Storage.listKeys('local')).to.be.eql(['e']))
    it('Storage list keys full by type', () => expect(Storage.listKeys('local', true)).to.eql(['--e--', 'e']))
    it('Storage has key a', () => expect(Storage.hasKey('a')).to.be.equal(true))
    it('Storage not has key x', () => expect(Storage.hasKey('x')).to.be.equal(false))
  })

  describe('Remove and Clear function', () => {
    it('Storage remove multiple keys', () => {
      Storage.remove(['a', 'b'])
      return expect(Storage.get(['a', 'b'])).to.eql([null, null])
    })
    it('Storage remove single key', () => {
      Storage.remove('c')
      return expect(Storage.get('c')).to.be.eql(null)
    })
    it('Storage clear localStorage', () => {
      Storage.clear('local')
      return expect(Storage.listKeys('local', true)).to.be.eql([])
    })
    it('Storage clear sessionStorage', () => {
      Storage.clear('session')
      return expect(Storage.listKeys('session', true)).to.be.eql([])
    })
  })
})