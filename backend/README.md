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

## Troubleshooting
If you are getting `command not found` when running virtualenv after installing it, I fixed the issue by adding the location to my $PATH.
You can do this by:
1. Running `pip3 show virtualenv` to find the install location for the package
2. Opening $PATH by running `sudo nano /etc/paths`
3. Add the install location as a new line to the file. (for me this was /Library/Frameworks/Python.framework/Versions/3.8/lib/python3.8/site-packages)
4. You should now be able to run virtualenv without any issues

## Running the API
1. Make sure you have the virtual environment activated before you do anything
2. Run `python3.8 db.py` to initialise the database. This will create the local file learning.db.  
3. Run `python3.8 app.py` to run the API.

* If you need to reload the database (when adding new data or changing the schema), run `python3.8 db.py` after making any changes to load them into the database.
