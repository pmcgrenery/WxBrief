# BUGS

1. Bug: When you enter a valid 4 letter ICAO code and click add airport, the modal remains in place with the value entered.
Fix: After the object newAirport has been successfully passed to the function storeNewAirport I included two functions. The first function clears the input value and the second function hides the modal.

2. Bug: If the user doesnt enter a valid ICAO code and selects Add Airport a warning message appears. If the user subsequently decides to close the modal and then decides to open the modal again, the warning message is still in place.
Fix: 

3. Bug: The 2 buttons side by side above the radar map are set to 50% width. despite this , they appeared stacked instead of the intended side by side.
Fix: apply a negative margin of 3px to pull the 2 buttons together and remove a margin that is applied to all elements in the body.

4. Bug: For some reason, after I add an airport to the list of airports and then try select any airport the functions on click function is not being called.
Fix: