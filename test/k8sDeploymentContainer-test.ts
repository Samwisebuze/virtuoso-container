// import { assert } from 'chai'
// import { describe, it } from 'mocha'
// import { DeploymentContainer } from '../src/K8sDeploymentContainer'

// /**
//  * Perform a smoke test of interacting with the k8s API
//  */
// describe('Kubernetes DeploymentContainer', () => {
//     it('should be well tested', () => {
//         const container = new DeploymentContainer('foo', 'nginx:1.17.6-alpine', 1)

//         const actualJSON = container.toJSON()
//         const expectedJSON = {
//             name: 'foo',
//             image: 'nginx:1.17.6-alpine',
//             ports: [{
//                 containerPort: 1
//             }]
//         }

//         assert.isOk(container)
//         assert.deepEqual(actualJSON, expectedJSON)
//     })
// })
