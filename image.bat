@echo off

REM Navigate to the directory containing your Flask app
cd C:\Users\brand\OneDrive\Desktop\resizer

REM Activate the virtual environment
call C:\Users\brand\OneDrive\Desktop\resizer\.venv\Scripts\activate

REM Run the Python script invisibly
start /min "" pythonw run_flask.py

REM Wait for a few seconds to ensure the server starts
timeout /t 0.5

REM Open the default web browser to the Flask app
start http://127.0.0.1:5000

REM Exit the current command prompt window
exit
