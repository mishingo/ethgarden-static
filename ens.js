const { wallet } = require('demo-keys')
const { Logger, getConfig, getNetwork } = require('demo-utils')
const LOGGER = new Logger('ens')
const { parsed } = require('dotenv').config()
const { assert } = require('chai')

//const ENS = require('ethjs-ens')
const ENS = require('ethereum-ens')
const eth = getNetwork()
const PUBLIC_RESOLVER_ADDRESS="0xD3ddcCDD3b25A8a7423B5bEe360a42146eb4Baf3"
const namehash = require('eth-ens-namehash')

const func = async () => {
  await wallet.init({unlockSeconds: 10})
  const deployerAddress = getConfig()['DEPLOYER_ADDRESS']
  const deployerPassword = getConfig()['DEPLOYER_PASSWORD']
  LOGGER.info('deployerAddress', deployerAddress)
  LOGGER.info('deployerPassword', deployerPassword) 
  assert( await wallet.validatePassword({address: deployerAddress, password: deployerPassword }) )
  const { signerEth } = await wallet.prepareSignerEth({address: deployerAddress, password: deployerPassword })
  const chainId = await eth.net_version()
  console.log('Chain ID', chainId)
  const ens = new ENS(signerEth.provider)
  //const ens = new ENS({provider: signerEth.provider, network: chainId })
  await ens.resolver('ourgarden.eth').addr().then((addr) => console.log('Address', addr))
  const params = { from: deployerAddress, gas: getConfig()['GAS_LIMIT'] }
  const name = 'anewworld.ourgarden.eth'
  //const txHash = ens.setSubnodeOwner('anewworld.ourgarden.eth', deployerAddress, {from: deployerAddress, gas: getConfig()['GAS_LIMIT']} )
  //const txHash = await ens.setResolver('anewworld.ourgarden.eth', PUBLIC_RESOLVER_ADDRESS, {from: deployerAddress, gas: getConfig()['GAS_LIMIT']}, PUBLIC_RESOLVER_ADDRESS )
  const resolver = ens.resolver(name)
  const node = namehash.hash(name)
  const txHash = await resolver.setAddr('0x48a5C048908d6028D42b744c347E96D7BfDc008c', params)
  console.log('txHash', JSON.stringify(txHash))
  //wallet.shutdownSync()
}

func()
