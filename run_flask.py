import os
import subprocess
import sys

# Set the environment variable for the Flask app
os.environ['FLASK_APP'] = 'main.py'

# Run the Flask app
subprocess.run([sys.executable, '-m', 'flask', 'run', '--debug'])