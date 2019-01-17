# name-ly

Welcome to name-ly! Yes, this app generated its own name!

I'll take your through a short quiz and give you a list of awesome, unique names. Whether you're at a loss while creating a Dungeons and Dragons character, or if you're looking for some unique options to name your child, give it a try at https://name-ly.herokuapp.com/.

## Features
Right now, you answer three short questions on the homepage and you'll be presented with a list of name options. If you don't like those names, hit the try again button to retake the quiz.

You can save the names to your profile by logging in or signing up!

## How does it work?
The name generator is run by the name-ly API (https://github.com/fchikwekwe/name-ly-API). This is a companion microservice that I developed. It dynamically adds and removes names from a corpus and runs those names through a Markov chain, providing you with unique names every time.

## Testing
[WIP] Mocha and Chai were used for testing. To run tests for this project, type the command 'mocha' or 'npm test' into your console from the root folder.

## Running
If you've cloned the repo, this project can be run locally at http://localhost:3000/. To check it out, type the command 'npm start' into your console from the root folder. The current, live version of name-ly can be accessed here: http://name-ly.herokuapp.com/.

## Future Development
Continued development on this project will be ongoing. For a list of current tasks and potential future features, check out notes.md.

If you would like to contribute to this project, please contact @fchikwekwe and I'll be glad to have you.

#### Contributors
👩🏾‍💻 Faith Chikwekwe
