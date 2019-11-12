# Breakout in React

As a small, personal challenge, I wanted to build a web app in [React](https://reactjs.org/).  

I spend most of my time on back-end work, and what front-end experience I do have is old and mostly not browser-based, so I was starting almost from scratch.

The end result here is not remotely polished, because I gave myself a limited time for this exercise.  But I did learn about React components and their state management, which was the point.

You can play the end result at [thedanielbrauer.com/breakout](https://thedanielbrauer.com/breakout)

### What it looks like

![](ballBounceMon.gif)

### Potential next steps
  
If I gave myself more time, I would consider doing the following:
* **Testing**.  React is [testable](https://reactjs.org/docs/testing.html), and the only reason I didn't include tests was because I was focused on gaining some rudimentary understanding of components and state management.  Testing would, I think, be the most important next step. 
* **Converting to Typescript**.  I'd initially intended to do this in Typescript, and in prep had converted [React's tic-tac-toe tutorial](https://github.com/danbrauer/react-tic-tac-toe) from JS to TS.  The burden of getting React to work with Typescript, however, ended up distracting me from learning React, so I reverted to plain JS.  I miss Typescript and would prefer to work in it.
* **Cleaning up the code**.  Lots of my methods here take lots of parameters, which is bad style, error-prone, and confusing. 

### How this was deployed

This exercise was about trying new things, even if for their own sake, and I'd heard that Heroku makes deploying apps easy, so I did their [getting started](https://devcenter.heroku.com/start) tutorial and then followed the steps [here](https://create-react-app.dev/docs/deployment/#heroku).

(If I had to rely on things I already knew, I could have deployed this from an AWS Lambda fronted by an API Gateway.  It would involve wrapping the React app in Express, then using [aws-serverless-express](https://github.com/awslabs/aws-serverless-express).)

### Why this

I hazily remembered building a version of [Breakout](https://en.wikipedia.org/wiki/Breakout_(video_game)) in Java Swing, a long long time ago, and it seemed like a good exercise.

### Starting point

I used [this code](https://codesandbox.io/s/5qvyyyjrx) as reference on how to get draw shapes and get ball bouncing inside a square.

But then I had to rewrite most of it to allow my components to interact.

The ball and square components initially kept their own states, which seems like a React anti-pattern.  [I'd read](https://reactjs.org/tutorial/tutorial.html#lifting-state-up) that state should travel only one way, from parent components to children.  If two children need to share state (for example to determine whether a ball hits a paddle or a brick) then that should be coordinated by some parent component.
 

  

