# Bugs

1. Bug: When you enter a valid 4 letter ICAO code and click add airport, the modal remains in place with the value entered.
<br>Fix: After the object newAirport has been successfully passed to the function storeNewAirport I included two functions. The first function clears the input value and the second function hides the modal.

2. Bug: If the user doesnt enter a valid ICAO code and selects Add Airport a warning message appears. If the user subsequently decides to close the modal and then decides to open the modal again, the warning message is still in place.
<br>Fix: 

3. Bug: The 2 buttons side by side above the radar map are set to 50% width. despite this , they appeared stacked instead of the intended side by side.
<br>Fix: apply a negative margin of 3px to pull the 2 buttons together and remove a margin that is applied to all elements in the body.

4. Bug: After I add an airport to the list of airports and then try select any airport the <code>.onclick()</code> function is not being called. After some investigation, I found that this was due to the fact that the event listeners do not work well with dynamically created elements. [StackOverflow Article]("https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript")
<br>Fix: Use event delegation to overcome the fact that the elements I'm trying to select are dynamically created. The event listener in place is now attached to the parent with <code>class="airports"</code> and it listens out for a click event on one of its children with a class of <code>"airport-selector"</code>.

5. Bug: The radar displays a forecast position of the weather radar returns as well as the actual historic conditions. At a quick glance this can lead to the impression that the weather is closer to an airport than it actually is which could effect the decision making process of the user.
<br>Fix: Remove the future frames from the rainviewer.js code. This also reduces the amount of data that has to be downloaded for each airport which improves the UX with a quicker load time.

6. Bug: After clearing all airports, if you press enter both modals appear.
<br>Fix: The reason for this was that after clicking on the Clear Airports button and either clicking on Yes/No/Close, then the button remains in focus. Therefore, when you press enter, it triggers the Clear Airports button as well as the event listener to call the Add Airport modal. The fix for this is to add <code>event.preventDefault()</code> to the event listener for pressing Enter.

7. Bug: On iPhones the installed full screen plug in for leaflet does not work. When clicked it enables single finger navigation of the map but does go to full screen. As well as this, the radar controls disappear once the map goes to fullscreen view.
<br>Fix: Removed the full screen plug in and replaced the initial plug in with the <code>.requestFullscreen()</code> method. Along with code to have cross browser compatibility it was discovered that it worked on everything except iPhones. Unfortunately, the method is not supported on iPhones. In the end, to allow cross browser compatibility I ended up with code that just takes the div containing the radar and toggles custom css styling. While this does not hide the address bar on mobile devices, it is the optimum solution to ensure the function works across all devices.

8. Bug: Some buttons render differently on iPhones.
<br>Fix: After some research this is a known issue on iPhones, and the solution is to disable appearance settings that is autonmatically applied. [Stackoverflow article](https://stackoverflow.com/questions/5438567/css-submit-button-weird-rendering-on-ipad-iphone)

9. Bug: When you go to fullscreen on the map, tiles at the edge of the display do not load until you move the map so that the entire tile is in view.
<br>Fix: Apply <code>map.invalidateSize();</code> to the map every time the map changes from normal size to fullscreen size and vice versa. The root cause is that the div renders on the screen initially in normal size, the map essentially "remembers" this size and still thinks it is this size when it gets larger. So you just have to tell the map to forget its old size and to take the new size of the div as the size to be displayed. [Github post](https://github.com/Leaflet/Leaflet/issues/941)


# Existing Bugs