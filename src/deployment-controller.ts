import Docker from 'dockerode'

/**
 * Deploy the given Network if it doesn't already exist.
 * Save the Deployment for the Network in MongoDB.
 * 
 * Given a network configuration to create via Command,
 * check if that network already exists (by name).
 * If not, create the network via the Docker API
 * and return a success message.
 * 
 * If the networkId already exists as a active Deployment in
 * Docker, do nothing.
 */
export const createDeployment = async (command: Object): Promise<Object> => {
    // Pretend that a Command to create a new network just came in
    // TODO: This incoming data will be replaced with an incoming object of type Network
    // const commandContent = command.data
    console.info('Incoming event:', JSON.stringify(command))

    const docker = new Docker()

    docker.createContainer({
        Image: 'containernet',
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
        OpenStdin: false,
        StdinOnce: false
      }).then(function(container) {
        auxContainer = container;
        return auxContainer.start();
      }).then(function(data) {
        return auxContainer.resize({
          h: process.stdout.rows,
          w: process.stdout.columns
        });
      }).then(function(data) {
        return auxContainer.stop();
      }).then(function(data) {
        return auxContainer.remove();
      }).then(function(data) {
        console.log('container removed');
      }).catch(function(err) {
        console.log(err);
      });

    // @ts-ignore
    // const networkId = <string>commandContent.networkId
    // @ts-ignore
    // const deploymentContainers = <DeploymentContainer[]>commandContent.containers

    // Preliminary check: ensure unique ports
    // const portsSet = new Set<number>(deploymentContainers.map(entry => entry.port))

    // if (portsSet.size !== deploymentContainers.length) {
    //     // All ports are not unique, deployment cannot continue
    //     return new Event('ContainerService', 'FailedToCreateNetwork', {
    //         message: 'Ports not unique',
    //         networkId
    //     })
    // }

    // // note: the name of each container is the machineId of the machine in the network definition

    // // Connect to mongoose  TODO: move this connection to higher level
    // await mongoose.connect(MONGO_URI, { dbName: MONGO_DBNAME })

    // // MongoDB: First, check if the deployment already exists
    // const deploymentExists = await DeploymentModel
    //                             .findOne({ networkId: networkId, removed: false })
    //                             .exec()

    // if (deploymentExists != null) {
    //     // Nothing to do
    //     return new Event('ContainerService', 'DidCreateNetwork', { networkId })
    // }

    // // K8s: Carry out deployment
    // // TODO: Convert incoming 
    // const [deploymentId, _] = await K8Api.createDeployment(deploymentContainers, networkId)

    // // MongoDB: Save deployment metadata for later usage
    // const deploymentMachinesMetadata = deploymentContainers.map(entry => {
    //     const machine = new IDeploymentMachine()
    //     machine.machineId = entry.name
    //     machine.routingPort = entry.port // TODO: fix this
    //     return machine
    // })

    // const deploymentMetadata = new IDeployment()
    // deploymentMetadata.deploymentId = deploymentId
    // deploymentMetadata.networkId = networkId
    // deploymentMetadata.ownerId = 'ownerid-here' // TODO
    // deploymentMetadata.machines = deploymentMachinesMetadata
    // await DeploymentModel.create(deploymentMetadata)

    // return new Event('ContainerService', 'DidCreateNetwork', { networkId })
    return {}
}

// // const mongoose = require('mongoose')
// import { K8Api } from './k8s'
// // import { DeploymentModel, IDeployment, IDeploymentMachine } from './model'
// import { DeploymentContainer } from './K8sDeploymentContainer'


// // TODO: replace with environment variable
// // const MONGO_URI = 'mongodb://root:root@localhost:27017/'
// // const MONGO_DBNAME = 'test'

// // mongoose.set('useNewUrlParser', true)
// // mongoose.set('useUnifiedTopology', true)
// // mongoose.set('useCreateIndex', true)
// // mongoose.set('useFindAndModify', false)


// /**
//  * Deploy the given Network if it doesn't already exist.
//  * Save the Deployment for the Network in MongoDB.
//  * 
//  * Given a network configuration to create via Command,
//  * check if that network already exists (by name).
//  * If not, create the network via the K8s API
//  * and return a success message.
//  * 
//  * If the networkId already exists as a active Deployment in
//  * Kubernetes, this action does nothing.
//  * 
//  * Uses K8s Deployments under the hood do configure and deploy pods
//  * and replace pods if they go down.
//  */
// export const createDeployment = async (command: Command): Promise<Event> => {
//     // Pretend that a Command to create a new network just came in
//     // TODO: This incoming data will be replaced with an incoming object of type Network
//     const commandContent = command.data
//     // @ts-ignore
//     const networkId = <string>commandContent.networkId
//     // @ts-ignore
//     const deploymentContainers = <DeploymentContainer[]>commandContent.containers

//     // Preliminary check: ensure unique ports
//     const portsSet = new Set<number>(deploymentContainers.map(entry => entry.port))

//     if (portsSet.size !== deploymentContainers.length) {
//         // All ports are not unique, deployment cannot continue
//         return new Event('ContainerService', 'FailedToCreateNetwork', {
//             message: 'Ports not unique',
//             networkId
//         })
//     }

//     // note: the name of each container is the machineId of the machine in the network definition

//     // Connect to mongoose  TODO: move this connection to higher level
//     await mongoose.connect(MONGO_URI, { dbName: MONGO_DBNAME })

//     // MongoDB: First, check if the deployment already exists
//     const deploymentExists = await DeploymentModel
//                                 .findOne({ networkId: networkId, removed: false })
//                                 .exec()

//     if (deploymentExists != null) {
//         // Nothing to do
//         return new Event('ContainerService', 'DidCreateNetwork', { networkId })
//     }

//     // K8s: Carry out deployment
//     // TODO: Convert incoming 
//     const [deploymentId, _] = await K8Api.createDeployment(deploymentContainers, networkId)

//     // MongoDB: Save deployment metadata for later usage
//     const deploymentMachinesMetadata = deploymentContainers.map(entry => {
//         const machine = new IDeploymentMachine()
//         machine.machineId = entry.name
//         machine.routingPort = entry.port // TODO: fix this
//         return machine
//     })

//     const deploymentMetadata = new IDeployment()
//     deploymentMetadata.deploymentId = deploymentId
//     deploymentMetadata.networkId = networkId
//     deploymentMetadata.ownerId = 'ownerid-here' // TODO
//     deploymentMetadata.machines = deploymentMachinesMetadata
//     await DeploymentModel.create(deploymentMetadata)

//     return new Event('ContainerService', 'DidCreateNetwork', { networkId })
// }


// /**
//  * Update the given Network's Deployment.
//  * Has the ability to add, modify, or delete individual containers.
//  * 
//  * Saves configuration updates in MongoDB.
//  */
// const updateNetwork = async (command: Command) => {
//     // Find the Deployment configuration in MongoDB for the Network
//     // If the Deployment configuration doesn't exist, then the Deployment 

//     return
// }


// /**
//  * Given the Network ID, delete the Deployment and mark as removed in MongoDB. 
//  */
// export const shutdownDeployment = async (command: Command): Promise<Event> => {
//     // Pretend that a Command to create a new network just came in
//     const commandContent = command.data
//     // @ts-ignore
//     const networkId = <string>commandContent.networkId

//     await mongoose.connect(MONGO_URI, { dbName: MONGO_DBNAME })

//     // MongoDB: Given the networkId, get the corresponding deployment id that is alive (not removed)
//     const result = await DeploymentModel
//                             .findOne({ networkId: networkId, removed: false })
//                             .exec()

//     if (!result) {
//         return new Event('ContainerService', 'ShutdownNetworkError', { networkId })
//     }

//     // K8s: Shutdown the network by it's deployment id
//     const deploymentId = result.deploymentId
//     const didDelete = await K8Api.deleteDeployment(deploymentId)

//     if (didDelete) {
//         // MongoDB: Mark as removed
//         await DeploymentModel
//                 .findOneAndUpdate({ deploymentId: deploymentId }, { removed: true })
//                 .exec()
//         return new Event('ContainerService', 'DidShutdownNetwork', { networkId })
//     }

//     // Something went wrong
//     return new Event('ContainerService', 'ShutdownNetworkError', { networkId })
// }


// /**
//  * A method for users to access a machine in a given network
//  * Command includes the machineId, networkId, and the user command to run.
//  * Responds with the machines response to the user command.
//  * 
//  * @param command
//  * @returns Event
//  */
// export const accessNetworkMachine = async (command: Command): Promise<Event> => {
//     // Pretend that a Command to create a new network just came in
//     // TODO: Replace this with a defined UserCommand type
//     const commandContent = command.data
//     // @ts-ignore
//     const networkId = <string>commandContent.networkId
//     // @ts-ignore
//     const machineId = <string>commandContent.machineId
//     // @ts-ignore
//     const userCommand = <string>commandContent.userCommand

//     // MongoDB: Check if there is an active deployment with networkId.
//     //          If so, get the document in Mongo.

//     // Using MongoDB document, check if machineId is in the list
//     // If so, get the corresponding containerId.

//     // K8s API: Execute the given userCommand and get the response.

//     const responseData = ''

//     return new Event('ContainerService', 'ExecMachineResponse', { data: responseData })
// }
