# Breakout in React

I have virtually no experience with modern web development, and thought I could learn a bit by trying to build a partial version of [Atari's Breakout](https://en.wikipedia.org/wiki/Breakout_(video_game)), in React.  (Once upon a time, I did this in Java Swing and remember it being not so hard...)

### Progress so far
![](ballBounceMon.gif)

### Process notes

I used this code as reference on how to get a ball and a square bouncing inside it: https://codesandbox.io/s/5qvyyyjrx.

But then I had to rewrite most of it to allow my components to interact.

The components initially kept their own states, which seems like a React anti-pattern.  From what tiny bit I read it seems state should travel only one way, from parent components to children.  If two children need to share state (for example by determining whether a ball hits a paddle) then that should be coordinated by some parent component.
 
I had initially intended to do this in Typescript but adding in the burden of getting React to work with Typescript was too much, especially since the focus here was to understand React.  I miss Typescript.

The code is not tested, which is shameful.  As I understand it, React does allow some nice UI testing, and a reasonable next step here would be to learn how to do that.  (You could argue it would've been a reasaonble thing to do even earlier.)

The code has got lots of methods that take in lots of parameters, and that will get confusing before long.

I may not continue with this exercise, but even just this taught me a lot.


