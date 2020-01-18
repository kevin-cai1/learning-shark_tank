# Developing
## Setting Up
1. Make sure you have Python3.8 installed.
2. Create a Python virtual environment - run command `virtualenv .venv`
    - If command not found, install virtualenv using command `pip3 install virtualenv`
3. Activate the virtual environment - run command `source .venv/bin/activate`
    - If this is successful there will be a (.venv) at the front of your terminal
4. Install all the relevant dependencies into your virtual environment
    - this can be done with the command `pip3 install -r requirements.txt`
    - this only needs to be done at setup, and when additional packages are added to the project

## Running the API
1. Make sure you have the virtual environment activated before you do anything
2. Run `python3.8 api.py` to run the API.
