<p align="center">
  <img src="assets/images/wx-brief-logo-black.svg" style="width:600px">
</p>

<img src="assets/images/mockup.png">
<br><br>
 
# Table of Contents
 
- [User Story Testing](#user-story-testing)

- [Manual Testing](#manual-testing)
    - [Header](#Header)
    - [Footer](#footer)
    - [Home Page](#home-page)
    - [Gallery Page](#gallery-page)
    - [About Page](#about-page)
    - [Contact Page](#contact-page)
    - [404 Page](#404-page)
- [Bugs](#bugs)
- [Browser Testing](#browser-tests)
- [Automated Testing](#automated-testing)
    - [Google Lighthouse](#google-lighthouse)
    - [WAVE Tools](#wave-tools)
    - [W3C HTML Validator](#W3C-html-validator)
    - [W3C CSS Validator](#W3C-css-validator)
    - [Autoprefixer](#autoprefixer)
    - [A11y Color Contrast Checker](#a11y-color-contrast-checker)
 
# Testing
## User Story Testing
### **As a visitor to the site I want to see what services you provide.**
1. A user who initially lands on the site instantly sees the hero image in the background, hinting at the user the purpose of the site.
2. The logo further hints at the purpose of the site. Wx is short for weather and the cloud image around the letters adds to the impression of what the site is for.
3. The user sees the hero text that gives a brief description of the service.
4. Text below this gives further details on what the site offers.
5. An About page on the site gives further information to the user in an accordian type display. The subsections are About Us, FAQ and Legal Disclaimers.

<img src="docs/user-story-1.png" style="width:600px">
<br/>

### **As a visitor to the site I want to understand the terminology used on the landing page so that I can get a better understanding of what the service offers me.**
1. The user will find this information in the FAQ section of the About Page.
2. In this section the user has some basic description of what a METAR and TAF is, along with basic instructions of how to read these reports.
3. Below the basic instructions of how to read the reports, there are links to US Air Force, UK CAA and Nav Canada documents containing a full description of how to read the reports.

<img src="docs/user-story-2.png" style="width:600px">
<br/>
<img src="docs/user-story-3.png" style="width:600px">
<br/>
<img src="docs/user-story-4.png" style="width:600px">
<br/>

### **As a visitor, I want to find out more about your site, so that I can see more about the company and FAQ.**

1. The user can have both of these questions answered in the About Page. 

<img src="docs/user-story-5.png" style="width:600px">
<br/>

### **As a new user I want to see a sample list of airports so that I can see a sample of the service you provide.**
1.  When the user enters the Briefing page for the first time they will be presented with a modal giving a brief description of how to use the controls.
2. The modal also tells the user that a short list of sample airports has been added for them.
3. The user can then select any of the airports in the list so they can then go ahead and see the weather reports for that airport.
 
<img src="docs/user-story-6.png" style="width:600px">
<br/>

### **As a user, I want to see a quick overview of the current weather situation at my location, so that I can get a "big picture" overview of the current weather around me.**

1. When the user loads the site for the first time they are presented with a modal asking whether they would like to allow location or not.
2. If the user chooses not to allow location, then the map defaults to a view that shows Europe in one snapshot.
3. If the user chooses to allow location, then the map flys down to the users current location. The user can then see the radar returns at their location.


<img src="docs/user-story-7.png" style="width:600px">
<br/>
<img src="docs/user-story-8.png" style="width:600px">
<br/>
<img src="docs/user-story-9.png" style="width:600px">
<br/>
<img src="docs/user-story-10.png" style="width:600px">
<br/>
 
### **As a user, I want to see the current and forecast weather at a specific airport, so that I can know more about the weather at that airport.**
1. In the Briefing page, the user can add the airport they want to investigate.
2. The user selects that airport to enter the weather reports for that airport. This will load the wxreport.html page which presents the current and forecast weather to the user. The user will also see the radar map centered over the airport with a marker on the airport reference point.

<img src="docs/user-story-11.png" style="width:600px">
<br/>

### **As a user, I want a list of the runways along with the lengths of the runways, so that I figure out which runway/runways is/are currently in use.**

1. On entering the weather report for a specific airport, the runways are automatically loaded for that airport also.
2. The user can then compare the runway directions to the current and forecast wind at the airport and make an assessment of the runway in use.
3. 

<img src="docs/user-story-12.png" style="width:600px">
<br/>
<img src="docs/user-story-13.png" style="width:600px">
<br/>

### **As a user, I want to know the current UTC time, and current local time, so that I can get a quick readout of the times and know what the timezone is.**

1. On entering the weather report for a specific airport, the user is also presented with the current UTC time and the local time at that airport.

### **As a user, I want to know the elevation of the airport, so that I know if I can form an overall mental picture of the airport and so that I know whether I can expect any aircraft performance concerns or not.**

1. On entering the weather report for a specific airport, the user is also presented with the elevation of the airport in feet above sea level. The user can then make an assessment based on this data.

### **As a user, I want to add an airport to the list, so that I can see the weather at that airport.**

1. The user can add an airport by selecting the + icon on the controls bar or by selecting enter.
2. The user is presented with a modal that gives basic instructions of how to add an airport.
3. The user will recieve warnings in the modal if they fail to enter a known airport or enter the wrong number of characters.
4. The user then clicks Add Airport once they are happy they have entered the code correctly.
5. The screen then smooth scrolls down to the bottom of the page to show the newly added airport.

### **As a user, I want to delete an airport from the list of airports, so that I can declutter the list or remove airports that are no longer relevant to the flight.**

1. The user can click on the edit icon on the control bar.
2. A bin icon is added to each airport selector.
3. The user can select this icon and this will then delete that specific airport.
4. The airport slides up out of the list.

### **As a user, I want to build up a list of airports for today's flight, so that I can access the weather at each of the airports.**

1. The user can add a list of relevant airports one by one using the controls described above.

### **As a user, I want to be able to switch between radar and infrared satellite animations, so that I can get a good understanding of what the weather system looks like.**

1. At the bottom of the radar display there is a button to select between the two options. 
2. The current selection is highlighted in orange.

### **As a user, I want to be able to play/stop the radar animation as well as move from frame to frame, so that I can examine the current situation more thoroughly.**

### **As a user, I want to know what areas are covered by radar so that I know the extents of the radar coverage.**

### **As a user, I want to know of any areas of significant weather outside the areas of radar coverage, so that I know what sectors of airspace to expect significant weather systems.**

### **As a user, I want a visual presentation of all SIGMET's, so that I can consume the information in the SIGMET quickly and so that I don't have to plot the text readout on a map.**

### **As a user, I want to be able to see the full text of the SIGMET so I can get the full details of the affected altitudes, severity, type of hazard and any forecast changes.**

### **As a user, I want to be able to change the map base layer, so that I can customise the map to my preferences.**

### **As a user, I want a colour coded legend so that I can tell what type of precipitation exists in the area I am focusing on.**

### **As a user, I want to be able to navigate across the map, so that I can see and zoom in on areas of interest.**

### **As a user, I want a marker placed on the airport I am examining, so that when I pan across the map I can instantly see where the airport is and easily return to the area.**

### **As a returning user I want the list of airports I created to be there when I come back later so that I can get an update on the current weather at airports that are relevant to the flight.**

### **As a returning user I want to clear the list of airports that I previously entered for a different flight and populate a new list of airports so that I have a list of airports specific to today flights.**

### **As a user, I want to be able to make contact with the site owner, so that I can let the owner know of an issue on the site.**


## Manual Testing

The following elements and sections were tested using Chrome Developer Tools.

Chrome's screen size emulator was used to test the site on different screen sizes. All of the elements listed in this manual tesing section were tested on the following screen sizes:

| Viewport Size (px)| Description | Bootstrap Breakpoint |
| -------------- |-------------| -----------------|
| 320 x 568 | iPhone5/SE in Portrait | XS |
| 375 x 667 | iPhone 6/7/8 in Portrait | XS |
| 568 x 320 | iPhone 5/SE in Landscape | SM |
| 667 x 375 | iPhone 6/7/8 in Landscape | SM |
| 768 x 1024 | iPad in Portrait | M |
| 1024 x 768 | iPad in Landscape | L |
| 1280 x 800 | Common Laptop | XL |
| 1366 x 768 | Common Laptop | XL |
| 1440 x 900 | Macbook Pro 15 | XXL |
| 1920 x 1080 | Common Large Desktop Monitor | XXL |
| 2560 x 1440 | 5K desktop monitor  | XXL |

### Header
- The navigation links were tested to ensure that they work correctly on each page.
- Checked that the logo brand links to the home page from each page.
- Checked the navigation links work on smaller devices when the navbar collapses to a burger menu.
- Checked the underline from the left works on each link on each page and does not extend beyond the writing itself.
- Checked the current page relates to the correct link and that the applicable link appears slightly heavier than the other links.
- Checked the navigation links stay to the right on both small and large devices.
- Checked the header collapses to a burger menu at a point that allows the nav links to be accommodated comfortably before they collapse.
- Checked that the burger menu icon appears to the right on the smallest devices.
- Checked that the navigation links and logo have a font size that appears in proportion when viewed on large devices.
- Checked that the burger menu, when pressed, diplays the links and hides the links when pressed a second time.
- Checked the header appears the same size on all pages.
- Checked that pressing tab logically brings you from left to right.

<figure>
<img src="docs/header-desktop.png" style="width:600px"><br/>
<figcaption>Header on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/header-tablet.png" style="width:384px"><br/>
<figcaption>Header on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/header-mobile.png" style="width:207px"><br/>
<figcaption>Header on a mobile</figcaption>
</figure>
 <br/>

### Footer
 
- Checked that the social media links work and open in new tab.
- Checked the responsiveness of the footer on each page for all screen sizes.

<figure>
<img src="docs/footer-desktop.png" style="width:600px"><br/>
<figcaption>Footer on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/footer-tablet.png" style="width:384px"><br/>
<figcaption>Footer on a tablet</figcaption>
</figure>
<br/>
<figure style="display:block">
<img src="docs/footer-mobile.png" style="width:212px"><br/>
<figcaption>Footer on a mobile</figcaption>
</figure>
<br/>

### Home Page
 
- Ensured the callout appears above the car and above the couple in the picture on all screen sizes so that the main focus of the image is visible on all screen sizes.
- Ensured the image is such that the fold is always visible on all screen sizes below the hero image to encourage users to scroll down.
- Ensured the callout is an appropriate width on all screen sizes.
- Ensured the text is legible on all screen sizes.
- Ensured the text in the What We Do section is aligned towards the image on medium screen sizes and above.
- Ensured the images in the What We Do section take up the full screen width on x-small devices.
- Ensured the images in the What We Do section were stacked as per the wireframes on medium devices and larger.
- Ensured variable padding and margins depending on screen size to make the information more presentable worked correctly.
- Checked the forward and backwards buttons on the image carousel worked.
- Checked the interval timer allowed enough time to read each testimonial.
- Ensured the quote icons in the testimonials appeared on their own line and to the start and end of the quote.

<figure>
<img src="docs/hero-image-desktop.png" style="width:600px"><br/>
<figcaption>Homepage Hero Image on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/hero-image-tablet.png" style="width:384px"><br/>
<figcaption>Homepage Hero Image on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/hero-image-mobile.png" style="width:212px"><br/>
<figcaption>Homepage Hero Image on a mobile</figcaption>
</figure>
<br/>
<figure>
<img src="docs/what-we-do-desktop.png" style="width:600px"><br/>
<figcaption>Homepage What We Do on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/what-we-do-tablet.png" style="width:384px"><br/>
<figcaption>Homepage What We Do on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/what-we-do-mobile.png" style="width:212px"><br/>
<figcaption>Homepage What We Do on a mobile</figcaption>
</figure>
<br/>
<figure>
<img src="docs/testimonial-desktop.png" style="width:600px"><br/>
<figcaption>Homepage Testimonial on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/testimonial-tablet.png" style="width:384px"><br/>
<figcaption>Homepage Testimonial on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/testimonial-mobile.png" style="width:212px"><br/>
<figcaption>Homepage Testimonial on a mobile</figcaption>
</figure>

### Gallery Page
 
- Checked the carousel took up the full width of medium sized devices and smaller.
- Checked the gallery images appeared as intended on larger devices.
- Checked the interval timer was set to 5 seconds on all images.
- Checked the image quality was good on all device sizes while balancing load times.
- Checked the Enquire Now button linked to the Contact page
- Ensured all text on the page was centered on all screen sizes.
- Checked the carousel forward and back buttons worked.

<figure>
<img src="docs/gallery-desktop.png" style="width:600px"><br/>
<figcaption>Gallery on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/gallery-tablet.png" style="width:384px"><br/>
<figcaption>Gallery on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/gallery-mobile.png" style="width:212px"><br/>
<figcaption>Gallery on a mobile</figcaption>
</figure>

### About Page
 
- Checked the image at the top of the page appear correctly on all screen sizes.
- Checked each section had its own row.  
- Checked the slide in from the left animation worked and was timed correctly.
- Checked the fade in animation worked and was timed correctly.
- Checked the timings of the animations.
- Ensured the top of the iframe was hidden to hide the google map menu bar on all screen sizes.
- Ensured the bottom of the iframe was hidden to hide the google map scale and T&C's text on all screen sizes.
- Checked the map could be zoomed in and out and could be easily navigated.
- Checked the 2 finger zoom worked on touchscreen devices.
- Ensured the google map colour was appropriate to the website and in keeping with the theme.
 
<figure>
<img src="docs/lead-image-quote-desktop.png" style="width:600px"><br/>
<figcaption>Lead image and quote section on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/lead-image-quote-tablet.png" style="width:384px"><br/>
<figcaption>Lead image and quote section on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/lead-image-quote-mobile.png" style="width:212px"><br/>
<figcaption>Lead image and quote section on a mobile</figcaption>
</figure>
<br/>
<figure>
<img src="docs/about-desktop.png" style="width:600px"><br/>
<figcaption>About section on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/about-tablet.png" style="width:384px"><br/>
<figcaption>About section on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/about-mobile.png" style="width:212px"><br/>
<figcaption>About section on a mobile</figcaption>
</figure>
<br/>
<figure>
<img src="docs/map-desktop.png" style="width:600px"><br/>
<figcaption>Embedded Google Map on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/map-tablet.png" style="width:384px"><br/>
<figcaption>Embedded Google Map on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/map-mobile.png" style="width:212px"><br/>
<figcaption>Embedded Google Map on a mobile</figcaption>
</figure>
<br/>

### Contact Page
 
- Checked the image at the top of the page appear correctly on all screen sizes.
- Checked that the enquiry form appeared first above the contact details on medium devices and smaller.
- Checked that each input field on the form was given a shadow when the field was being interacted with.
- Checked each input field would only take the appropriate data. eg email will only take an email etc.
- Checked the calendar button works on various devices so users can select dates rather than have to write them.
- Checked the required fields worked correctly and wouldn't allow a form submit without being filled.
- Checked the phone number input would not accept any less than 10 digits.
- Checked the phone number does not accept letters.
- Checked the form could not be submitted before the required fields were filled out.
- Checked the modal is brought up only after the form has been successfully been submitted.
- Checked the data inputted on the form automatically clears when the form has been successfully submitted.
- Ensured the contact details appeared to the right hand side, as intended, on large devices.
- Checked the phone number opened the appropriate app on all devices when pressed.
- Checked the email address opened the appropriate app on all devices when pressed.

<figure>
<img src="docs/contact-desktop.png" style="width:600px"><br/>
<figcaption>Contact page on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/contact-tablet.png" style="width:384px"><br/>
<figcaption>Contact page on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/contact-mobile.png" style="width:212px"><br/>
<figcaption>Contact page on a mobile</figcaption>
</figure>
<br/>

### 404 Page

- Checked the 404 page appeared when any url other than those that exist in the project are entered. eg https://pmcgrenery.github.io/ms1-the_rolls/information.html
- Checked the link to the home page returns the user to the home page as intended.
- Checked the 404 page appears as intended on all device sizes.

<figure>
<img src="docs/404-desktop.png" style="width:600px"><br/>
<figcaption>404 page on a desktop</figcaption>
</figure>
<br/>
<figure>
<img src="docs/404-tablet.png" style="width:384px"><br/>
<figcaption>404 page on a tablet</figcaption>
</figure>
<br/>
<figure>
<img src="docs/404-mobile.png" style="width:212px"><br/>
<figcaption>404 page on a mobile</figcaption>
</figure>
<br/>

## Bugs

### Bugs Fixed:

1. Bug: When you enter a valid 4 letter ICAO code and click add airport, the modal remains in place with the value entered.
<br>Fix: After the object newAirport has been successfully passed to the function storeNewAirport I included two functions. The first function clears the input value and the second function hides the modal.

2. Bug: If the user doesn't enter a valid ICAO code and selects Add Airport a warning message appears. If the user subsequently decides to close the modal and then decides to open the modal again, the warning message is still in place.
<br>Fix: Add a function to clear all warnings when modals are closed.

4. Bug: After I add an airport to the list of airports and then try select any airport the <code>.onclick()</code> function is not being called. After some investigation, I found that this was due to the fact that the event listeners do not work well with dynamically created elements. [StackOverflow Article]("https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript")
<br>Fix: Use event delegation to overcome the fact that the elements I'm trying to select are dynamically created. The event listener in place is now attached to the parent with <code>class="airports"</code> and it listens out for a click event on one of its children with a class of <code>"airport-selector"</code>.

5. Bug: The radar displays a forecast position of the weather radar returns as well as the actual historic conditions. At a quick glance this can lead to the impression that the weather is closer to an airport than it actually is which could effect the decision making process of the user.
<br>Fix: Remove the future frames from the rainviewer.js code. This also reduces the amount of data that has to be downloaded for each airport which improves the UX with a quicker load time.

6. Bug: After clearing all airports, if you press enter both modals appear.
<br>Fix: The reason for this was that after clicking on the Clear Airports button and either clicking on Yes/No/Close, then the button remains in focus. Therefore, when you press enter, it triggers the Clear Airports button as well as the event listener to call the Add Airport modal. The fix for this is to add <code>event.preventDefault()</code> to the event listener for pressing Enter.

7. Bug: On iPhones the installed full screen plug in for leaflet does not work. When clicked it enables single finger navigation of the map but does go to full screen. As well as this, the radar controls disappear once the map goes to fullscreen view.
<br>Fix: Removed the full screen plug in and replaced the initial plug in with the <code>.requestFullscreen()</code> method. Along with code to have cross browser compatibility it was discovered that it worked on everything except iPhones. Unfortunately, the method is not supported on iPhones. In the end, to allow cross browser compatibility I ended up with code that just takes the div containing the radar and toggles custom css styling. While this does not hide the address bar on mobile devices, it is the optimum solution to ensure the function works across all devices and also allows the radar controls to remain displayed in fullscreen.

8. Bug: Some buttons render differently on iPhones.
<br>Fix: After some research this is a known issue on iPhones, and the solution is to disable appearance settings that are autonmatically applied. [Stackoverflow article](https://stackoverflow.com/questions/5438567/css-submit-button-weird-rendering-on-ipad-iphone)

9. Bug: When you go to fullscreen on the map, tiles at the edge of the display do not load until you move the map so that the entire tile is in view.
<br>Fix: Apply <code>map.invalidateSize();</code> to the map every time the map changes from normal size to fullscreen size and vice versa. The root cause is that the div renders on the screen initially in normal size, the map essentially "remembers" this size and still thinks it is this size when it gets larger. So you just have to tell the map to forget its old size and to take the new size of the div as the size to be displayed. [Github post](https://github.com/Leaflet/Leaflet/issues/941)

10. Bug: When you zoom in and out and pan across the map for a while the SIGMET polygons disappear and sometimes they reappear when at the center of the screen. 
<br>Fix: After some research I found this is a known issue with the leaflet map when you plot geoJSON polygons to the map and assign the lines a weight. Originally the line weight for the polygons was set to a number value. The fix is just to remove the line weight value.

11. Bug: On the About Page there is a JQueryUI accordian type display. Originally, I put the code to call the JQueryUI function for this in the effects.js file. However, the library that this code is loaded from is only loaded on the about page. Therefore, an error is thrown on every other page as the <code>$.accordian</code> function is not recognised.
<br>Fix: The fix for this was to place the code that calls the accordian function in the jQueryUI library in a separate file that is loaded only on the About page.

12. Bug: On occasion the leaflet <code>layer.getBounds</code> function fails to work on international SIGMETS.
<br>Fix: To issue stemmed from an intermittent issue where the Leaflet <code>getBounds</code> function failed to work. This function was being used to get the extents of the polygon then the <code>getCenter</code> function was applied. A Leaflet marker was then applied to this point. To overcome this issue where <code>getBounds()</code> was intermittently not recognised, I changed over to using Leaflet's <code>bindTooltip</code> function instead which has a built in option to get the center of its parent.

### Existing Fixed:

1. Bug: On occasion some of the png tiles containing the radar/satellite pictures fail to load and a 404 error is displayed in the console. It appears rarely and generally only lasts for a period of 10 minutes. The issue is generally minimal as it is isolated to only a small number of tiles when it does happen and generally seems to effect tiles over Asia. This is an issue on Rainviewer's end and there is nothing I can do to solve this issue.

## Automated Testing
 
The site was tested using the following validators and online tools:
 
### Google Lighthouse
Based on initial results from Google Lighthouse the following changes were made to the site:
 
- Added a Meta description to each page.
- Added a 'rel="noopener"' attribute to the social media links to improve security.
- Text colour in the Enquire button on the callout lacked sufficient colour contrast so that was changed to the same colour as the rest of the text and the background changed to a silver colour.
- Converted images from jpg to jp2 in order to improve first contentful paint time.
- Added a Meta Theme color.
- Added a title to the iframe google map for accessibility.
- Added an Apple touch icon and subsequently included favicon images.
 
<figure>
    <div style="text-align:center">
        <img src="docs/lighthouse-results.png" alt="lighthouse test results">
    </div>
</figure>
<figcaption style="text-align:center">Lighthouse Test Results after changes were made</figcaption>
 
### WAVE Tools
Bases on initial results from the web accessibility tool the following were added:
- Fixed the order of headings so that the site will make more sense to users.
- Added an aria-label to divs with a picture in the background to improve accessibility.
- Fixed the aria-current page attribute in the header navbar to relate to the correct pages.
 
There are 2 redundant link alerts on the WAVE tool remaining:
- The Logo brand in the header and the Home navigation link are duplicate links and lead to the same page. As the navigation bar collapses to a burger menu on smaller screens I decided to keep the Logo brand as a link so that the user can easily navigate to the home page without having to open the burger menu.
- The Enquire Now button on the home page and the gallery page are duplicates of the Contact navigation link. As the buttons are calls to action I decided to keep the links as they are.
 
<figure>
    <div style="text-align:center">
        <img src="docs/wave-results.png" alt="WAVE test results" height="300px">
    </div>
</figure>
<figcaption style="text-align:center">WAVE Test Results after changes were made</figcaption>
 
### W3C HTML validator
[W3C HTML Validator](https://validator.w3.org/) yielded the following issues:
- Issues mainly related to the use of incorrect semantic markup.
    - Fix: To overcome this I changed the semantic markup of the files to clear the warnings.
- Erroneous addition of <code>type="textarea"</code> attribute to the textareas in the form on contact.html. 
    - Fix: These were deleted to remove the error.
- An issue with the iframe map which originally had an attribute of <code>width="100%" height="450"</code>. 
    - Fix: The width attribute should have a pixel value and not a % value. To overcome this I modified style.css for <code>map-inner</code> to add <code>width:100%</code> and <code>height:470px</code> and removed the width and height attributes from the iframe.
 
### W3C CSS validator
[W3C CSS Validator](https://jigsaw.w3.org/css-validator/) yielded no issues. 
 
### Autoprefixer
 
[Autoprefixer CSS Online](https://autoprefixer.github.io/) was used to check for any issues relating to prefixes in the CSS code. The test revealed prefix omissions relating to the linear gradients used for the background and the box shadows applied to some images and buttons. These omissions were corrected and no issues were found.
 
### A11y Color Contrast Checker
 
[A11y Color Contrast Accessibility Validator](https://color.a11y.com/Contrast/) Used to check the contrast of the colors to ensure the site is accessible. No issues were found and the actual contrast ratios well exceeded the accepted standards.

<figure>
    <div style="text-align:center">
        <img src="docs/color-contrast-results.png" alt="WAVE test results" width="600px">
    </div>
</figure>
<figcaption style="text-align:center">A11y Color Contrast Results</figcaption>