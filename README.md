# Breakout in React

I got a teensy bit of exposure to React at my day job, and thought it'd be interesting to learn it a bit more. 

I thought I'd do this by trying to build a rudimentary version of Atari's Breakout, because once upon a time, and a very long time ago indeed, I did this in Java Swing and remember it being not so hard.

I have effectively zero web front-end experience (I coded some JSPs many years ago, but that's about it) so this'll be interesting.

Process:
* I took this code as a starting point: https://codesandbox.io/s/5qvyyyjrx (I had some prior code in Typescript but gave up on TS because I just don't know ebough about React to both learn it and convert to TS as I go.)
* The code above had a field and bouncing balls.  I modified it to add a paddle, and have a ball respond to the paddle.
* The code was actually a poor starting point in one regard: it didn't seem to adhere to React's idea of having state travel one way, and not have objects track their own state but rather have it be shared by the most common that needs to track its child's states.  So I had to lift a lot of states on the paddle and ball and field.
* One that was done, adding rudimentary brick interaction was straightforward.
* The code is at present a mess.  I miss Typescript.

I may not continue with this exercise, even just this simple exercise, plus a tutorial I did beforehand, taught me a bit about React's handling of states.
