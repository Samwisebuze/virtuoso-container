import { prop, arrayProp, getModelForClass, addModelToTypegoose, buildSchema, Ref, index, pre } from '@typegoose/typegoose'
import * as mongoose from 'mongoose'


class IDeploymentMachine {
    @prop({ required: true, index: true, unique: true })
    machineId: string // unique id generated given to this service by the network service

    @prop({ required: true, unique: true })
    routingPort: number // port defined for software defined networking (containers in the same pod must communicate over unique ports on localhost)
}


/**
 * Definition of the "desired state" of a Kubernetes deployment
 */
@index({ deploymentId: 1, networkId: -1 }, { unique: true }) // Create a unique compound index (key) for DeploymentSchema consisting of the `deploymentId` and `networkId`
@pre<IDeployment>('save', function(next) {
    // Update timestamp on every save
    const now = new Date()

    if (!this.createdAt) {
        this.createdAt = now
    }

    this.updatedAt = now

    next()
})
class IDeployment {
    // metadata
    // ---
    @prop({ required: true, default: 1 })
    version?: number // incremental document versioning

    @prop({ required: true, unique: true })
    deploymentId: string // unique indexed generated by this service

    @prop({ required: true })
    networkId: string // indexed (non-unique) given to deployment by Network (a network can have multiple deployments - some of which can be removed)

    @prop({ required: true })
    ownerId: string

    @prop({ required: true, default: false })
    removed?: boolean

    @prop()
    createdAt: Date

    @prop()
    updatedAt: Date

    // configuration
    // ---
    @prop({ required: true, default: 1 })
    replicas?: number // we only need 1 of each machine

    @arrayProp({ itemsRef: IDeploymentMachine, refType: mongoose.Schema.Types.ObjectId })
    machines?: IDeploymentMachine[] // List of Machines that are deployed
}


// Build Deployment Schema (remove the `_id` field - it's not needed here)
const deploymentSchema = buildSchema(IDeployment)

// Build Deployment Model
const DeploymentModel = addModelToTypegoose(mongoose.model('Deployment', deploymentSchema), IDeployment)


export { DeploymentModel, IDeployment, IDeploymentMachine }
