const packet = require('dns-packet')
const { ethers } = require('hardhat')
const { utils } = ethers
const { use, expect } = require('chai')
const { solidity } = require('ethereum-waffle')
const n = require('eth-ens-namehash')
const provider = ethers.provider
const namehash = n.hash
const { deploy } = require('../test-utils/contracts')
const { keccak256 } = require('ethers/lib/utils')

use(solidity)

const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ROOT_NODE =
  '0x0000000000000000000000000000000000000000000000000000000000000000'

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'

function encodeName(name) {
  return '0x' + packet.name.encode(name).toString('hex')
}

const CANNOT_UNWRAP = 1
const CANNOT_BURN_FUSES = 2
const CANNOT_TRANSFER = 4
const CANNOT_SET_RESOLVER = 8
const CANNOT_SET_TTL = 16
const CANNOT_CREATE_SUBDOMAIN = 32
const PARENT_CANNOT_CONTROL = 64
const CAN_DO_EVERYTHING = 0

describe('PoC 5', () => {
  let ENSRegistry
  let BaseRegistrar
  let NameWrapper
  let NameWrapperV
  let MetaDataservice
  let signers
  let dev
  let victim
  let hacker
  let result
  let MAX_EXPIRY = 2n ** 64n - 1n

  before(async () => {
    signers = await ethers.getSigners()
    dev = await signers[0].getAddress()
    victim = await signers[1].getAddress()
    hacker = await signers[2].getAddress()
  })

  beforeEach(async () => {
    result = await ethers.provider.send('evm_snapshot')
  })
  afterEach(async () => {
    await ethers.provider.send('evm_revert', [result])
  })

  describe('test fuzz', () => {
    /*
     * Attack scenario:
     *  + The hacker owns a domain (or a 2LD), e.g., base.eth 
     *  + The hacker assigns a sub-domain to himself, e.g., sub1.base.eth
     *      + The expiry should be as large as possible
     *  + Hacker assigns a sub-sub-domain, e.g., sub2.sub1.base.eth
     *      + The expiry should be as large as possible
     *  + The hacker unwraps his sub-domain, i.e., sub1.base.eth
     *  + The hacker re-wraps his sub-domain, i.e., sub1.base.eth
     *      + The expiry can be small than the one of sub2.sub1.base.eth
     */
    it('haha', async () => {
        fuzz = await deploy('FuzzENS');
        await fuzz.setUp();
        await fuzz.exp();
    })
  })
})
