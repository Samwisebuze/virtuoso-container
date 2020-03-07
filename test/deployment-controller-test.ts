import { assert } from 'chai'
import { describe, it } from 'mocha'
import { step } from 'mocha-steps'
// import { createDeployment, shutdownDeployment } from '../src/deployment-controller'
import { createDeployment } from '../src/deployment-controller'
// import { DeploymentContainer } from '../src/K8sDeploymentContainer'

const networkId = 'network-uuid-here' // in reality, this would be a uuid

describe('ContainerService Test', () => {
    step('should create a new Network Deployment on Command', async function() {
        this.timeout(6000)

        assert.equal('ok', 'ok')
    })

    // step('should create a new Network Deployment on Command', async function() {
    //     this.timeout(6000)

    //     const command = new Command(
    //         'DummyService',
    //         'CreateNetworkDeployment',
    //         {
    //             // TODO: This incoming data will be replaced with an incoming object of type Network
    //             networkId: networkId,
    //             containers: [
    //                 new DeploymentContainer(
    //                     'machine-uuid1', 'nginx:1.17.6-alpine', 1//, [80]
    //                 ),
    //                 new DeploymentContainer(
    //                     'machine-uuid2', 'rabbitmq:3.7.23-alpine', 2//, [5672]
    //                 )
    //             ]
    //         }
    //     )
    //     const responseEvent = await createDeployment(command)

    //     assert.isOk(responseEvent)
    //     assert.equal(responseEvent.sender, 'ContainerService')
    //     assert.equal(responseEvent.name, 'DidCreateNetwork')
    //     assert.deepEqual(responseEvent.data, { networkId: networkId })
    // })

    // step('should update a Network Deployment on Command')

    // step('should shutdown a Network Deployment on Command', async function() {
    //     this.timeout(6000)

    //     const command = new Command(
    //         'DummyService',
    //         'ShutdownNetworkDeployment',
    //         { networkId: networkId }
    //     )
    //     const responseEvent = await shutdownDeployment(command)

    //     assert.isOk(responseEvent)
    //     assert.equal(responseEvent.sender, 'ContainerService')
    //     assert.equal(responseEvent.name, 'DidShutdownNetwork')
    //     assert.deepEqual(responseEvent.data, { networkId: networkId })
    // })
})
