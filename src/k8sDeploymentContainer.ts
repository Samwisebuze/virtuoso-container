/**
 * Kubernetes Deployment Container definition
 * https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment
 */
export class DeploymentContainer {
    public readonly name: string
    public readonly image: string
    public readonly port: number // a unique port assigned to each container for cross-container communication (note: this is different than software defined ports)
    
    constructor(name: string, image: string, port: number) {
        this.name = name
        this.image = image
        this.port = port
    }

    // JSON object describing the container for deployment in K8s
    // Software defined incoming and outgoing port information is not needed
    // for kubernetes deployments
    public toJSON() {
        return {
            name: this.name,
            image: this.image,
            ports: [{
                containerPort: this.port
            }]
        }
    }
}
