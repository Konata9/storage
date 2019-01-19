import { expect } from 'chai'
import typecheck from '@konata9/typecheck.js'
import Storage from './../index'

describe('Default value check', () => {
  it('Storage type: Object', () => expect(typecheck(Storage)).to.be.equal('object'))
  it('Storage get default type: session', () => expect(Storage.getType()).to.be.equal('session'))
  it('Storage set type: local', () => {
    Storage.setType('local')
    return expect(Storage.getType()).to.be.equal('local')
  })
  it('Storage set type: session', () => {
    Storage.setType('session')
    return expect(Storage.getType()).to.be.equal('session')
  })
  it('Storage set error: null', () => expect(() => Storage.setType()).to.throw(Error, 'Storage type can not be null'))
  it('Storage set error: other string', () => expect(() => Storage.setType('a')).to.throw(Error, 'Type must be local or session'))
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
    it('Storage mutiple set and get', () => {
      Storage.set({ a: 1, b: 2, c: 3 })
      return expect(Storage.get(['a', 'b', 'c'])).to.be.eql([1, 2, 3])
    })
    it('Storage single set and get', () => {
      Storage.set('d', [1, 2])
      return expect(Storage.get('d')).to.be.eql([1, 2])
    })
    it('Storage set item type error', () => expect(() => Storage.set([])).to.throw(Error, 'InsertItem only accept object or string'))
    it('Storage get item type error', () => expect(() => Storage.get({})).to.throw(Error, 'KeyItem only accept array or string'))
  })

  describe('List and Has fucntion', () => {
    it('Storage list keys', () => expect(Storage.listKeys()).to.be.eql(['a', 'b', 'c', 'd']))
    it('Storage has key a', () => expect(Storage.hasKey('a')).to.be.equal(true))
    it('Storage not has key x', () => expect(Storage.hasKey('x')).to.be.equal(false))
    it('Storage haskey type error', () => expect(() => Storage.hasKey(null)).to.throw(Error, 'Key must be a string'))
  })

  describe('Expired function check', () => {
    it('Storage set expires key', () => {
      Storage.set('e', { a: 233 }, true)
      return expect(Storage.get('__e__')).to.not.equal(null)
    })
    it('Storage check unexpired key: e', () => expect(Storage.checkExpired('e')).to.be.equal(false)
    )
    it('Storage check expired key: f', () => {
      Storage.set('f', [233], true, -1 * Storage.ONE_HOUR)
      return expect(Storage.checkExpired('f')).to.be.equal(true)
    })
    it('Storage check expired no key', () => expect(Storage.checkExpired('a')).to.be.equal(null))
    it('Storage get expired key: f', () => expect(Storage.get('f')).to.be.equal(null))
    it('Storage get expired muilte keys: g, h, i', () => {
      Storage.set('g', 1, true, -1 * Storage.ONE_DAY)
      Storage.set('h', 2, true, -1 * Storage.ONE_DAY)
      Storage.set('i', 3, true, -1 * Storage.ONE_DAY)
      return expect(Storage.get(['a', 'g', 'h', 'i', 'c'])).to.be.eql([1, null, null, null, 3])
    })
  })

  describe('Remove and Clear function', () => {
    it('Storage remove mutiple keys', () => {
      Storage.remove(['a', 'b'])
      return expect(Storage.get(['a', 'b'])).to.eql([null, null])
    })
    it('Storage remove single key', () => {
      Storage.remove('c')
      return expect(Storage.get('c')).to.be.eql(null)
    })
    it('Storage remove type error', () => expect(() => Storage.remove({})).to.throw(Error, 'KeyItem only accept array or string'))
    it('Storage clear storage', () => {
      Storage.clear()
      return expect(Storage.listKeys()).to.be.eql([])
    })
  })
})