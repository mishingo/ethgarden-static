const { wallet } = require('demo-keys')
const { Logger, getConfig, getNetwork } = require('demo-utils')
const LOGGER = new Logger('ens')
const { parsed } = require('dotenv').config()
const { assert } = require('chai')

//const ENS = require('ethjs-ens')
const ENS = require('ethereum-ens')
const eth = getNetwork()
const PUBLIC_RESOLVER_ADDRESS={
  "1": "0xD3ddcCDD3b25A8a7423B5bEe360a42146eb4Baf3",
  "4": "0x2396A687f75f1a13e3927F1841B291350b0ED977",
}
const namehash = require('eth-ens-namehash')

const func = async () => {
  await wallet.init({unlockSeconds: 20})
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
  //await ens.resolver('ourgarden.eth').addr().then((addr) => console.log('Address', addr))
  const params = { from: deployerAddress, gas: getConfig()['GAS_LIMIT'] }
  const name = 'ourgarden.eth'
  //const txHash = ens.setSubnodeOwner('anewworld.ourgarden.eth', deployerAddress, {from: deployerAddress, gas: getConfig()['GAS_LIMIT']} )

  const publicResolverAddress = PUBLIC_RESOLVER_ADDRESS[chainId]

  const txHash2 = await ens.setResolver(
    'ourgarden.eth', publicResolverAddress,
    {from: deployerAddress, gas: getConfig()['GAS_LIMIT']},
    publicResolverAddress
  )
  console.log('Set resolver', txHash2)
  
  const resolver = ens.resolver(name)
  const node = namehash.hash(name)
  const txHash = await resolver.setAddr(deployerAddress, params)
  console.log('Set address', JSON.stringify(txHash))
  //wallet.shutdownSync()
}

func()
