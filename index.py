from flask import Flask, request, jsonify

app = Flask(__name__)


# JSON POST request format:
# {
# 	"networkId": "<unique id>",
# 	"networkDetails": [
#         {
#             "machineId": "<unique id>",
#             "machineAddress": "<unique address>",
#             "machineType": "<host | switch>",
#             "adjacentMachines": [<list of adjacent machine ids>]
#         },
#         ...
#     ]
# }
# 
#
# Example curl (note that the content-type is 'application/json'):
# curl --request POST \
#  --url http://127.0.0.1:5000/api/v1/create-network \
#  --header 'content-type: application/json' \
#  --data '{
# 	"networkId": "<unique id>",
# 	"networkDetails": [
#         {
#             "machineId": "<unique id>",
#             "machineAddress": "<unique address>",
#             "machineType": "<host | switch>",
#             "adjacentMachines": [<list of adjacent machine ids>]
#         }
#       ]
#    }'
@app.route('/api/v1/create-network', methods=['POST'])
def create_network():
    if request.data:
        incoming_json = request.get_json()
        network_id = incoming_json['networkId']
        network_details = incoming_json['networkDetails']

        # Machine information is now available as a list of objects:
        #   - machineId
        #   - machineAddress
        #   - machineType
        #   - adjacentMachines
        print(network_details)

        return jsonify({ 'status': 'OK' })
    else:
        return jsonify({ 'status': 'not OK' })


# Example curl (note that the content-type is 'application/json'):
# curl --request DELETE \
#  --url http://127.0.0.1:5000/api/v1/delete-network \
#  --header 'content-type: application/json' \
#  --data '{
# 	    "networkId": "<unique id>"
#    }'
@app.route('/api/v1/delete-network', methods=['DELETE'])
def destroy_network():
    if request.data:
        incoming_json = request.get_json()
        network_id = incoming_json['networkId']

        # Destroy the given network by network_id...

        return jsonify({ 'status': 'OK' })
    else:
        return jsonify({ 'status': 'not OK' })


if __name__ == '__main__':
    app.run()
