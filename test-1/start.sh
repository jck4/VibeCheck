#!/bin/bash

# Start SSH server in the background
/usr/sbin/sshd -D &

# Start Flask application
cd /app
flask run --host=0.0.0.0 