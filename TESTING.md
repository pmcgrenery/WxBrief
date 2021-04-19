# BUGS

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

6. Bug: The local time and utc time do not update at the exact same time, so the local time updates to the new minute before the UTC time updates.
<br>Fix: After some experimenting I found that the local time was approx 1000 ms ahead of the utc time. As the utc time is derived from a locally created date object I decided that this was the more accurate of the two values. So I subtracted 1000 ms from the localTimeStamp to bring it in line with the locally created utc time. While these times are not perfectly exact in real terms, it achieved the desired effect of having the 2 times update simultaneously while having the time accuracy to +/- 1 second. Having the accuracy at +/- 1 second is more than sufficient for the purposes of this application as the time frames for the weather changes are in hours. 