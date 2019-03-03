# MEAN-Software-Irrigation
Software irrigation website made with the MEAN stack.

TO RUN THIS APPLICATION:
  - Requirements:
    - A .envrc file with the following variables:
       - export OKTA_ORG_URL=
       - export OKTA_TOKEN=
       - export OKTA_CLIENT_ID=
       - export OKTA_CLIENT_SECRET=
       - export SECRET=
       - export OKTA_APPBASEURL=
       - export OKTA_CALLBACK_URI=
   Please note: the above variables must be properly set (have the correct values)


  - First time setup:
       1. Open a terminal and go into this application's directory.
       2. Type "npm install" then press Enter.


  - On Windows:
       1. Open Cmder and go into this application's directory.
       2. Type "bash" then press Enter.
       3. Type ". .envrc" then press Enter.
       4. Type "npm start" then press Enter.
       5. Open a browser and go to localhost:3000

  - On Linux:
       1. Open a terminal and go into this application's directory.
       2. If this is the first launch on your current machine type ". .envrc" then press Enter.
       3. Type "sudo npm start > ~/log &" then press Enter.
       Clarification on the above step: npm will start and have all output logged into a file called
       "log" then the ampersand tells the terminal to make it a background process.
       If it doesn't automatically become a background process just press "CTRL + Z" then type bg.
       4. Open a browser and go to localhost:3000
  
