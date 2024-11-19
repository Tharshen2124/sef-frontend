# SEF Frontend

## Installation 
1. Clone the repository to any folder using the command:
```
git clone https://github.com/Tharshen2124/sef-frontend.git
```

2. Once you have cloned the repository, ensure you have npm and node installed. If you dont have it, go this website https://nodejs.org/en and click the button that says "Download Node.js (LTS)".

3. Then, go to your command line and run `npm i`. This will install all the packages necessary for our project.
4. To run the project, run `npm run dev` and you are done!

## Project Layout
```
|-- src
    |-- components
        |-- componentA
            - index.jsx
            - style.css
    |-- pages
    |-- utils
    - App.jsx
    - main.jsx
    - index.css
- .env
```
- `components` -> contain folders of components. Take a look at how a component folder should look like for `componentA`,. It should have a `.jsx` file and a `.css` file. The objective of doing this is we wanna ensure the styling and component logic can be found in a given folder. We wouldn't want to search through the whole repository to find where a component's logic exists (unless its using our own defined global functions and etc, then its fine.)

- `pages` -> contain the pages of our website. The `App.jsx` will contain the Router component where you will need to paste your page component in there to be detected by the router.

- `utils` -> contain utility functions or functions that are used in many places for the purposes of making it easier to import and refer to. 

- `index.css` -> this file is where the global css styles are defined. 

- `App.jsx` -> this file contains the components found in the pages folder where the router component routes to. 

- `.env` -> this file is where you put your keys, urls, secrets or any sort of string that its value needs to be kept private and should not be displayed in the project folder in our remote repository