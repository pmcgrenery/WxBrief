https://cssbuttoncreator.com/ Used to style airport selectors

https://loading.io/ Used to create loading.gif image


<div style="text-align:center">
<img src="##" style="width:600px">
<br><br><br><br>
<img src="##" style="width:1000px">
</div>
 
 
# Table of Contents
 
- [Project Overview](#project-overview)
 
- [UX Design](#ux-design)
 
    - [Strategy](#strategy-plane)
    - [Scope](#scope-plane)
    - [Structure](#structure-plane)
    - [Skeleton](#skeleton-plane)
    - [Surface](#surface-plane)
 
- [Features](#features)
 
- [Technologies Used](#technologies-used)
 
- [Testing](#testing)
 
- [Deployment](#deployment)
 
- [Credits](#credits)
 
# Project Overview
This project is for Milestone 2 of the Code Institute Full Stack Developer Course. The purpose of the project is to develop an interactive front end site.
 
WxBrief is a site that presents aviation weather information to users. Users can get an overview of the weather at their current location and then dig deeper and see the current and forecast weather at airports that they select.
 
The site can be viewed [here](https://pmcgrenery.github.io/WxBrief).
# UX Design
 
## Strategy Plane
 
### **The Business Goals:**

-   Create an easy to use interactive site where users can easily access the current weather at any airport.
-   Primarily target the site at professional pilots, but make it easy to use for private pilots also.
-   Provide worldwide information to the user.
-   Present a professional and clear branding.
 
### **Target Clients:**
-   Professional Pilots. Ages 20-65 years old.
-   Private Pilots. Ages 16-85 years old.
 
### **Tech considerations:**
-   The site is targeted at a very wide age group, so it is important that it is easy to use and navigate.
-   The site is targeted at private and professional pilots, so to improve user experience the site should use symbology and formatting that the typical users are familiar with.
 
### **User Stories:**
-   As a visitor to the site I want to see what services you provide.
-   As a visitor to the site I want to understand the terminology used on the landing page so that I can get a better understanding of what the service offers me.
-   As a visitor, I want to find out more about your site, so that I can see more about the company and FAQ.
-   As a new user I want to see a sample list of airports so that I can see a sample of the service you provide.
-   As a user, I want to see a quick overview of the current weather situation at my location, so that I can get a "big picture" overview of the current weather around me.
-   As a user, I want to see the current and forecast weather at a specific airport, so that I can know more about the weather at that airport.
-   As a user, I want a list of the runways along with the lengths of the runways, so that I figure out which runway/runways is/are currently in use.
-   As a user, I want to know the current UTC time, and current local time, so that I can get a quick readout of the times and know what the timezone is.
-   As a user, I want to know the elevation of the airport, so that I know if I can form an overall mental picture of the airport and so that I know whether I can expect any aircraft performance concerns or not.
-   As a user, I want to add an airport to the list, so that I can see the weather at that airport.
-   As a user, I want to delete an airport from the list of airports, so that I can declutter the list or remove airports that are no longer relevant to the flight.
-   As a user, I want to build up a list of airports for today's flight, so that I can access the weather at each of the airports.
-   As a user, I want to be able to switch between radar and infrared satellite animations, so that I can get a good understanding of what the weather system looks like.
-   As a user, I want to be able to play/stop the radar animation as well as move from frame to frame, so that I can examine the current situation more thoroughly.
-   As a user, I want to know what areas are covered by radar so that I know the extents of the radar coverage.
-   As a user, I want to know of any areas of significant weather outside the areas of radar coverage, so that I know what sectors of airspace to expect significant weather systems.
-   As a user, I want a visual presentation of all SIGMET's, so that I can consume the information in the SIGMET quickly and so that I don't have to plot the text readout on a map.
-   As a user, I want to be able to see the full text of the SIGMET so I can get the full details of the affected altitudes, severity, type of hazard and any forecast changes.
-   As a user, I want to be able to change the map base layer, so that I can customise the map to my preferences.
-   As a user, I want a colour coded legend so that I can tell what type of precipitation exists in the area I am focusing on.
-   As a user, I want to be able to navigate across the map, so that I can see and zoom in on areas of interest.
-   As a user, I want a marker placed on the airport I am examining, so that when I pan across the map I can instantly see where the airport is and easily return to the area.
-   As a returning user I want the list of airports I created to be there when I come back later so that I can get an update on the current weather at airports that are relevant to the flight.
-   As a returning user I want to clear the list of airports that I previously entered for a different flight and populate a new list of airports so that I have a list of airports specific to today flights.
-   As a user, I want to be able to make contact with the site owner, so that I can let the owner know of an issue on the site.

 
### **Competitor Review:**
[Sky Vector](https://skyvector.com/)

A US-based online flight planner.

- Pros: 
    -   Excellent, full-featured site.
    -   Clear map with details of airspace.
    -   Ability to hover over airports and get a popup with the current METAR and TAF.
    -   Ability to enter the flight plan route.
- Cons: 
    -   The weather radar only covers the US, and there is no radar mask showing the extents of the radar coverage.
    -   The infrared satellite imagery rarely works.
    -   The base map is so detailed it leads to information overload at some zoom levels.
    -   Only really targets a US audience.
    -   Very poor UX on mobile sized devices.
 
[Aviation Weather Center](https://aviationweather.gov/)
 
A US government-owned and run site. 

- Pros:
    - Full-featured site that provides all types of aviation weather information.

- Cons:
    - To get a METAR and a TAF for an airport you must go to two different parts of the website.
    - Cumbersome site on large screens -> Using the scroll on the mouse scrolls the page and zooms the map at the same time.
    - Extremely difficult to use on mobile devices.
 
[Avia Weather](https://play.google.com/store/apps/details?id=com.mytowntonight.aviationweather&hl=en&gl=US)

Android and Apple app for getting METAR's and TAF's.

- Pros:
    - Clear presentation of weather data.
    - Plain English conversion of raw METAR and TAF for non-professional users.
    - Presentation of the current flight conditions (VFR/MVFR/IFR/LIFR) for non-professional pilots.
    
- Cons:
    - No radar or satellite information.
    - Cannot delete all airports in one go. Have to delete airports one by one.
 
### **Scope Plane**
 
The following must be incorporated:
-   A geolocated map on the home screen.
-   A method to store the list of airports so the user can come back to the list later.
-   A responsive design that will present the weather data in a logical format on all devices.
-   Weather data that covers the entire globe and not just one region.
-   Airport data i.e. Runways, time and elevation.
-   Easy and intuitive to navigate.
-   Easy to use tools to add/delete airports and to interact with the radar map.
-   Appropriate branding and colour palette for the business.
 
What could be incorporated?
-   A system to create a user account to allow cross-platform transfer of the airport list and user preferences.
-   An API that presents the location of aircraft in real-time so that the user can get an idea of the approach procedures that are in use at airports and to get a sense of areas where aircraft are currently avoiding weather.
-   The ability to search for airports by name and IATA (3 letters) code, so that users can get the weather for an airport if they have forgotten the ICAO code.
-   Ability to enter the flight number and download the ATC flight plan route or to manually enter the flight plan route waypoint by waypoint.
 
### **Structure Plane**

The site will likely primarily be used on mobile and tablet devices, so it is primarily be designed to operate on those platforms.

The structure of the site follows standard conventions. Each page has the same basic structure:
 
-   Navigation bar across the top with a burger menu on the right.
-   Main body of the page containing the relevant content.
-   Footer at the bottom of the page containing social media links and copyright text.
 
The website is broken into four different pages:
 
•   **Home**
As the landing page for the site, this page clearly outlines what the site offers and presents a call to action on the screen to go to the briefing section.

Below this, just above the fold, a map centred at the user's location showing SIGMETS and weather radar. In keeping with the theme of the site, the default base bap is a dark map from Mapbox.

•   **Briefing**
This page contains a list of the user's airports, tools to modify this list and navigation options to easily return to the last page. The user can select the airport to get the detailed weather report for the airport.

•   **About**
This page contains an accordion-type display showing the subsections of this page. The subsections are About Us, FAQ and legal terms.
 
•   **Contact**
This page contains a simple form for a user to submit a message to the website admin.
 
### **Skeleton Plane**

The wireframes below represent initial thoughts on the design of the site. The site changed as it evolved but the presentation of content remained largely the same as the wireframes.

<!--  -->
<!--  -->
<!--  -->
<!-- UPDATE THE WIREFRAMES -->
[Home Page Wireframes](wireframes/home-wireframe.png)

[Briefing Wireframes](wireframes/briefing-wireframe.png)

[Weather Report Wireframes](wireframes/wxreport-wireframe.png)
 
[About Wireframes](wireframes/about-wireframe.png)
 
[Contact Wireframes](wireframes/contact-wireframe.png)

<!--  -->
<!--  -->
<!--  -->

### **Surface Plane**
 
The project's aesthetic is designed to present a trustworthy, professionally designed weather web application.
 
#### Logo:

To create a logo that scaled well across all devices and zoom levels I decided to create the logo as an SVG image file type. This vector type image avoids any pixelation issues and renders perfectly on retina displays and adds to the professional aesthetic.

The chosen company name hints at the intended use and user of the site. Wx is short for weather in many settings, particularly in aviation, and brief is the term used in aviation for the period when preflight briefing is being completed. The Wx is surrounded by a cartoon type cloud, again, to hint at the purpose of this site. I chose to use a simple cartoon cloud instead of a picture to keep the desired clean, simple, professional aesthetic of the site.
 
#### Colour Scheme:

The app is designed to be used in cockpits in all lighting conditions. Cockpit displays in all aircraft are designed to have a dark background and pertinent information in bright contrasting colours. The reason for this is that screens with a bright background colour are very intrusive in a dark cockpit setting and straining on the eyes. 

As well as this the pilot's eyes must be well adapted to low light at night time so their eyes can pick up low-intensity light detail outside the cockpit windows. When a person's eyes are fully adjusted to the darkness they are approximately 10,000 to 1,000,000 times more sensitive than during the daytime and it takes 15 to 30 minutes for a person's eyes to fully adapt to darkness. It is therefore important that the user's eyes are not disturbed from the state where they are fully adapted to darkness.

Taking this into account I decided to go with an overall dark aesthetic for the site to minimise the intrusiveness of the device being used to present the information in a cockpit setting.

Across the wavelength of visible light, red has the lowest energy and longest wavelength and violet has the highest energy and shortest wavelength. For a given power, red light cannot be seen as easily at a distance as violet can, this is why ambulances have blue lights, and why armies use red lights to read maps at night. It also explains why red text can sometimes be hard to read in darkness, and why blue text can appear overly intense in darkness.

In keeping with the philosophy of keeping the display as unintrusive as possible, I decided to go with a colour that strikes the balance between readability and intensity and went with an orange as a contrasting colour to the dark background.
 
Specifically, the main colours used are:

<!--  -->
<!--  -->
<!--  -->
<!-- UPDATE THE COLOURS -->
<img src="docs/color-scheme.png">
 
#### Typography:

Readability is particularly important for this application, especially the ability to distinguish between 0(zero) and O. It is also favourable to have a font that is recognisable for the intended users. 

On many aircraft, the font used for METAR, TAF and SIGMET printouts is similar to IBM Plex Mono. As these weather reports are coded and not plain English it is much easier to read them with monospaced characters than with proportionally spaced characters. Of particular importance with this font, it distinguishes nicely between 0 and O with a dot inside the zero.

To complement this font I decided to stick with the complementary IBM Plex Sans font family for any plain English writing.

The font used for the logo and the landing page header is Lexend Zetta.

Google fonts were used for all of the fonts on the site.
 
#### Images:
 
The image used as the background image on the landing page is my own.
 
#### Animations:

- When the user lands on the site, the page loads then flys down to the user's current location. If the user has location turned off or denies location data then the map flys down to show Europe in one view. This is done using Javascript's built-in location API and combining that with Leaflets flyTo function.
 
- On the landing page a transparent header was used. When the user's scrolls down it fades to an opaque background. This is done using JQuery.
 
- On the landing page the get briefed button changes colour on hover, this is done using Bootstrap. It also scales smaller and then back to the original size on click, this is done using jQuery.

- The burger menu animates between 3 lines and an X when pressed. The middle line slides out and fades away, the bottom and top lines rotate 45 degrees to form the X. This is done using JQuery and CSS.

- The menu slides in from the right-hand side when commanded. This is done using JQuery's animate function.

- The radar/satellite frames play through the different radar frames when you press play at the bottom of the map.

- The right and left chevrons let the user jump one frame forward or backwards when pressed.

- The satellite and radar change the overlay on the map.

- The fullscreen button on the map takes the map and makes the radar take up the full size of the screen. This is done using JQuery and CSS. It also toggles the icon between expand and shrink.

- The Legend selector toggles the display of the legend on the right-hand side of the radar display.

- The layer selector toggles the display of the different base layer options when selected.

- On the airport page a modal fades in when a first time user arrives at the page. This is a bootstrap modal that is called by JQuery.

- On the airport page the add-airport modal fades in when a user clicks on the add airport button or when a user presses enter.

- After an airport has been successfully added the modal inputs are cleared and the modal fades away.

- On the airport page when a user clicks on the edit icon, the back button changes to a Clear All button, and the bin icon appears on all airports.

- When a user adds an airport the window automatically scrolls to the bottom of the page to show the user the new airport. 

- When a user chooses to delete a specific airport, the selected airport slides up out of view. This is done using JQuerys slideUp function.

- When a user selects an airport in the list of airports, it scales smaller and then back to its original size to simulate a button click.

- On the About page, the subsections are displayed in a JQuery accordion. This is an animation from [JQuerys UI API](https://jqueryui.com/).

- On the contact page, after successful form submission the user is presented with a modal that fades in telling the user the form has been successfully submitted.

# Features
 
The site has the same basic layout for each page with a fixed header across the top, the content below that and a sticky footer at the bottom.
 
The site is responsive to all screen sizes. This is done using [Bootstrap’s flexbox grid system](https://getbootstrap.com/docs/5.0/getting-started/introduction/) with its different responsive tiers, CSS media queries and by using javascript to measure and set heights of certain sections.


- Features across the entire site

- Header
 
    - The header sits at the top of each page.
    - The header is a fixed header that remains in place at the top of the screen when the user scrolls down to allow easy navigation no matter where the user is on the site.
    - The logo sits to the left of the header on all devices.
    - The logo is in SVG format to allow it to scale well across different screens and improve the logo display on retina displays.
    - The logo gets larger on larger screens.
    - The burger menu sits to the right of the header.
    - The burger menu animates to an X when clicked on.
    - Depending on the page the header has a title section and a controls section.
    - The header is transparent on the landing page and fades to opaque when the page is scrolled down 50 px or more. The header is opaque on all other pages.
    - The bottom of the header has a shadow to give the impression that the header sits above the rest of the content.
    
- Menu

    - The menu slides in from the right when the burger menu is clicked.
    - The 4 menu nav links and the horizontal rule beneath fades in when the menu slides in.
    - The nav links are placed a fixed distance from the right and halfway down the screen.
 
- Footer

    - A sticky footer that always sits to the bottom even if there is no content on the main part of the page. This is particularly important on the airport page when all airports are cleared.
    - Social media links in the form of icons sit at the top centre of the footer. The icons are [FontAwesome Icons](https://fontawesome.com/icons?d=gallery). The colour of the icons changes to a darker orange when hovered over.
    - Copyright fine centred at the bottom of the footer.

- Radar Map

    - The map contains all the controls needed to customise the display to the user's needs and to allow the user to focus on an area of interest.
    - To the left-hand side, there are controls to zoom in and out, view fullscreen, show map legend(relating to the radar intensity readouts) and a base map controller.
    - The zoom buttons zoom in and out 0.75 of a full unit of the default leaflet zoom steps.
    - The fullscreen gives the map a position fixed attribute and stretches it across the available area on the device.
    - The legend toggler show the legend on the right-hand side with the related precipitation intensities hanging off the left-hand side of the legend so that the user can hover these over an area of interest and examine the type of precipitation in a particular area.
    - The base layer button displays a list of available base layer maps. The default will be dark and the user can switch to dark, light or satellite imagery. The map base layers are provided by MapBox.
    - The radar data is provided by the Rainviewer API. I chose to use 256 px tiles as opposed to 512 px tiles to reduce the weight of the app on data so that it can be used on aeroplane wifi.
    - The radar data from Rainviewer API can be displayed in many different versions. The chosen radar display format is RAINBOW @ SELEX-SI. The intended users are pilots and the colour scheme used for the different precipitation types is the same as what pilots see on their built-in aircraft radar displays.
    - A semi-transparent radar mask is applied to the map to display to the user where there is radar coverage.
    - On the map, the SIGMETS are displayed as polygons. The raw data arrives as geoJSON type object, so I used leaflets built-in geoJSON plotting tool to plot these.
    - Each polygon has a label to quickly identify to the user the type of hazard that exists within the polygon. For example, TURB means turbulence, VA means volcanic ash, MTW means mountain wave.
    - Each polygon can be clicked on to display the full SIGMET text. This text gives the user more detailed information of the intensity, subtype, affected altitudes, where the weather is moving to, the forecast change in intensity and any other plain text information. For example, "1.5 INCH HAIL" can appear as a plain text output as there is no standardised way of saying this in a SIGMET.
    - The US SIGMET hazard types are longer strings than international SIGMET hazard types, so to keep clutter to a minimum on the map these hazard types are changed where applicable to be shortened snippets rather than full words. eg TURBULENCE becomes TURB.
    - The SIGMETS are colour coded for the type of hazard to improve the information presented to the user.
    - The radar controls sit at the bottom of the map window. from left to right, the top control bar has a play/pause button, the last frame selector, the frame time in UTC, and the next frame selector.
    - The bottom radar controls allow the user to toggle between weather radar and infrared satellite imagery.

- Features specific to each page
 
    - Home

        - A hero image in the background hinting to the user the purpose of the site.
        - Leads with an SVG image containing text saying Aviation weather, by pilots for pilots giving the new user an instant summary of the purpose of the site.
        - Beneath the hero header, a small snippet of text telling the user exactly what the site offers in a bit more detail.
        - A call to action in the form of a button to take the user to the briefing section of the site.
        - The radar map appears just above the fold on the vast majority of small devices so that users know to scroll down to see the map. On larger devices, the radar appears well above the fold with padding above and to the sides.
        - The map itself, geolocates to the user's particular location. It starts by showing the entire world and after a small time delay then flys down gently to the user's current location. This is done using Leaflets flyTo function.
        - If the user has the location turned off then the map flys down to show most of Europe in one snapshot regardless of the screen size. This is done using Leaflet's flyToBounds function.
    
    - Briefing

        - More elements are added to the header on this page to allow the user to have the controls in view regardless of where they have scrolled to on the page.
        - The first element attached beneath the basic header is a heading bar with Airports written in the header.
        - Beneath that, a control bar. Initially, the control bar contains a back button to return to the home page, a button to edit the list, and a button to add to the list of airports.
        - When a user lands on this page for the first time, the user is presented with a fade-in modal that welcomes the user and provides basic instructions on how to use the application.
        - When a first-time user lands on the page, there is already a list of sample airports for the new user to see how the application works and appears.
        - When a user selects the edit icon, the back button disappears and is replaced with a Clear All button. When pressed, this button triggers a fade in modal that double-checks with the user that they want to delete all airports.
        - When the user selects the edit button, each airport gets a bin icon to the right-hand side of its button. When the user clicks this bin icon that particular airport only is deleted. The deleted airport slides up out of view.
        - When a user selects the add icon or presses enter on the keyboard, the add airport modal fades in.
        - The modal gives basic instructions on how to add the airport to the list with a form label and placeholder text. 
        - The form input only accepts 4 letters and or digits. If the user enters a number of characters different to exactly 4 then a warning will appear in the modal telling the user that they must enter a 4 letter code.
        - If the user enters a 4 letter code that is not recognised in the worldwide database, the user will receive a warning saying that the airport entered does not exist.
        - If the user enters an airport that is already on the list, it will not add the airport and will alert the user to this.
        - When an airport is added, the screen automatically scrolls to the bottom to display the newly added airport.
        - The airports are added and displayed on the screen as a large button. Each button displays the ICAO, IATA and plain English name for the airport.
        - When the user clicks on an airport to access the weather specific to that airport, it shrinks and then bounces back to its original size to simulate a button click.

    - WxReport.html

        - This is the only page that cant be navigated to from the nav menu as the user must select the airport they want to retrieve weather info for first to display useful information.
        - As with the briefing page. The header also has a control bar in it but drops the title bar. The control bar just contains a back button like the briefing page.
        - Beneath the page header there is a title block similar to the briefings page, that contains the ICAO, IATA and plain English name of the airport.
        - Beneath this a section that shows the local time, UTC and the elevation of the airport.
        - The next section contains a table of all of the available runways at the airport, along with their length and width in meters.
        - Next section down is a METAR section with the most recent METAR report for the airport.
        - The next section contains the most recent TAF for the airport, with each timeframe taking a new line as is the standard format for TAFs.
        - Below this on a medium-sized device and smaller is the radar. Unlike the home page radar, this map is centred on the airport and adds a marker on the airport so the user can pan around the screen and not lose sight of where the airport is.

    - About

        - This page has a header similar to the briefing page, with a title bar, and a control bar.
        - The control bar has a back button.
        - This page contains subsections for About Us, FAQ, Legal Text. 
        - The subsections each occupy a section of an accordion-type display. This is done to reduce clutter on the page.

    - Contact

        - This page, again, has a header similar to the airport page to keep consistency across all pages. The header contains a title and a back button that returns the user to the home page.
        - This page leads with a call to the user to get in touch.
        - Below this, there is a simple form for the user to get in touch with the site admin.
        - This form plugs into email.js to send an email to the website admin.
        - All input fields are required.
        - When the form is successfully submitted it triggers a fade in modal telling the user that the form has been submitted and that somebody will be in touch ASAP.
    
    - 404 Page
    
        - The page appears when a user tries to open a non-existent page.
        - A text box lets the user know they are in the wrong place and contains a link to return to the home page.

# Technologies Used
## Languages Used

- HTML
 
- CSS

- JavaScript
 
## Frameworks, Libraries, Programs, Online Tools and APIs Used
 
- **[JQuery](https://www.jquery.com)**. Used extensively throughout the project to select elements, animate elements, make calls to API among many other things.

+ **[JQuery UI](https://www.jqueryui.com)** This library was used on the About page to implement the accordion animation.
 
- **[Font Awesome](https://fontawesome.com/)**. Used for the icons that were included throughout the project.
 
- **[Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)** Used throughout the project to implement the vast majority of the responsiveness in the design.
 
- **[Google Fonts](https://fonts.google.com/about)** Used for all of the fonts that appear on the site.
 
- **[Google Chrome Dev Tools](https://developers.google.com/web/tools/chrome-devtools)** Used extensively to test responsiveness, javascript code etc.
 
- **[Leaflet Map](https://www.leafletjs.com)**. Used as the foundation for the interactive radar map. This is a free and open-source javascript library.

- **[Leaflet Providers](https://github.com/leaflet-extras/leaflet-providers)** This Leaflet plugin was added to the project to simplify the addition of Mapbox base layers to the map. This is a free open-source plugin.
 
- **[Balsamiq](https://balsamiq.com/)** - Used to create wireframes.
 
- **[Gitpod](https://gitpod.io/)** - Used to code HTML, CSS and javascript.
 
- **[GitHub](https://github.com/)** Used as a code repository and to host the site on Github pages.
 
- **[Resizing.app](https://resizing.app/features/resize-png/)** - Used to resize the background image for quicker loading.
 
- **[Favicon.io](https://favicon.io/favicon-generator/)** 
 
- **[Cssgradient.io](https://cssgradient.io/)** Used to create colour gradient background used on the airport selector buttons.

- **[Gravit Designer](https://www.designer.io/en/?psd-campaign=1693840974&psd-adgroup=66081713215&psd-kw=gravit%20designer)** This online vector graphics creator platform was used to create the SVG images used on the site.
 
- **[emailjs](https://www.emailjs.com)** Used to connect the contact form to an email service.

- **[A11y Color Contrast Accessibility Validator](https://color.a11y.com/Contrast/)** Used to check colour contrast of the site for accessibility.

- **[W3C CSS Validator](https://jigsaw.w3.org/css-validator/)** Used to validate CSS3 code.

- **[W3C HTML Validator](https://validator.w3.org/)** Used to validate HTML5 code.

- **[WAVE Accessibility Tool](https://wave.webaim.org/)** Used to check the accessibility of the site.
 
- **[Autoprefixer CSS Online](https://autoprefixer.github.io/)** Used to check for css prefix omissions to ensure cross browser compatibility.

- **[Rapid API Airport](https://www.rapidapi.com)** This API is a free and unlimited API that was used to get the airport information on the airport page. 

- **[AVWX](https://avwx.docs.apiary.io/#)** This open-source API was used to retrieve METAR, TAF, runways and airport elevation. The API is limited to 4000 free calls per day and premium tiers are available above this.

- **[Rainviewer API](https://rainviewer.com/api.html)** This API is entirely free. It is used to provide radar imagery, infrared satellite imagery and radar coverage mask.

- **[Timezone DB API](https://timezonedb.com/api)** This API was used to get the UTC offset for the chosen airport. The API takes in the latitude and longitude and then supplies the UTC offset for that location. The API is entirely free.

- **[Aviation Weather Center API](https://www.aviationweather.gov/help/webservice)** This US government weather provider API was used to get the live SIGMETs to plot on the map.

# Testing
 
Details of the testing carried out can be viewed in a separate [TESTING.md file](TESTING.md)
 
# Deployment

## How the project was deployed on GitHub Pages.
 
The project was coded in Gitpod, committed to Git and pushed to GitHub. The project was deployed from its Github repository using GitHub Pages. 
 
The steps to deploy the site to GitHub pages are as follows:
 
1. log in to Github.
2. Select the pmcgrenery/ms1-the_rolls repository.
3. On the top tab, select "Settings".
4. Scroll down to the "GitHub Pages" section.
5. Under source, select "Master" from the dropdown selection.
6. A second dropdown appears, ensure "/(root)" is selected.
7. Press the ""Save" button. The page will refresh.
8. Scroll back down to the "GitHub Pages" section. In the blue section under the heading, you will find the link to the deployed site.
 
## How to run the project in GitPod.
 
1. Download the [Chrome Web Browser](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjE05jL-IfvAhUY6-0KHVj0DRcYABABGgJkZw&ohost=www.google.com&cid=CAESQOD24xYvSkhGMwiKLgK3CrSybtFeT6R-oG_css2y6Lu6XGzyepb2ghN57ehHJkpg6_HSncFxVG78IwXHmXdD1q4&sig=AOD64_2PC1Ooz3rD0sq4NbhSvetwGzaCuw&q=&ved=2ahUKEwj40ZHL-IfvAhVAaRUIHQXoBT0QqyQoAHoECAsQEw&adurl=).
2. Download the [Chrome GitPod](https://www.gitpod.io/docs/browser-extension/) browser extension.
3. Create a [Github Account](https://github.com/join).
4. Log in to [GitPod](https://gitpod.io/login/), using your GitHub account details.
5. Navigate to [The Rolls Github repository](https://github.com/pmcgrenery/ms1-the_rolls).
6. Click on the green "Gitpod" button at the top of the repository above the file explorer.
7. Gitpod will load for you in a new tab.
8. The ReadMe file will be presented initially, you can navigate to the source code using the explorer on the left-hand side.
9. To display the site frontend in a separate browser tab, type "python3 -m http.server" into the terminal at the bottom of the screen and press Enter.
10. A notification will appear at the bottom right of the screen, click on Open Browser.
11. To allow you to enter commands in the terminal after opening a port to see the website front end you must first press "Ctrl + C" to interrupt the open port.
 
## How to run the project on a local machine.
 
1. Navigate to [The Rolls Github repository](https://github.com/pmcgrenery/ms1-the_rolls).
2. Click on the Code dropdown above the file explorer.
3. Under Clone, select the "HTTPS" option.
4. Copy the URL presented.
5. Open your local IDE.
6. Open the terminal
7. Create a directory where you would want this repository to be stored.
8. Type "git clone" and paste the URL in that you previously copied.
9. Press Enter and your local clone repository will be created.
 
For further information on how to clone a repository from GitHub click [here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).
For further information on how to clone a repository into your IDE please consult your provider's documentation.
 
# Credits
## Content
The content on the site is my own and written by me. However, it should be noted that [vintageweddingscars.ie](http://www.vintageweddingcars.ie/) was used for overall inspiration on what should be included.
 
## Media 
[Pexels.com](https://www.pexels.com) . Used for the three royalty free stock photos in testimonials section and the background image on the 404 page.
 
All other images are owned by me. Photographer: [David McClelland](https://davidmcclelland-photography.com/)
 
## Animations
 
[Animate.css](https://animate.style/) This external css file was used for the slide in and fade in animations used for the Henry Royce quote.
 
[Hover.css](https://ianlunn.github.io/Hover/) This external css file was used for the underline from center animation used on the navigation links.

[Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) Used throughout the project. The built in animations used were the carousel, button and modal.

## Code 
[How to Online](https://www.howtoonlinetips.com/hide-google-map-top-bar-embedded-header/). Used inspiration from the code on this site to hide the header on the embedded google map.
 
[Sympli.io](https://sympli.io/blog/heres-everything-you-need-to-know-about-favicons-in-2020/) Used the code on this blog to implement the favicon images on different devices.
 
[Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) Template code from the documentation on Bootstrap 5 was used to implement the responsiveness, navbar, carousel throughout the site. The code was heavily modified to suit this site.
 
[Stack Overflow](https://stackoverflow.com/questions/5214127/css-technique-for-a-horizontal-line-with-words-in-the-middle). Code from this post was used to place the horizontal lines beside the headings.
 
[Animate.css](https://animate.style/). Code from the documentation section of this library was used to modify the timing of the animations.
 
[Sympli.io](https://sympli.io/blog/heres-everything-you-need-to-know-about-favicons-in-2020/). Code from this site was used as a guide to implement the favicon images on different devices.
 
[Autoprefixer CSS Online](https://autoprefixer.github.io/) The output code from this automated test was used to correct the code that was already written by me.

[Codepen.io](https://codepen.io/hanapiers/pen/EXNrGP) Code from this site was modified and used to present the modal after the form has been submitted successfully.

[Stackoverflow.com](https://stackoverflow.com/questions/16452699/how-to-reset-a-form-using-jquery-with-reset-method) Code from this post was used to reset the form after submitting.

# Acknowledgements

- A massive thank you to my mentor Rohit Sharma for his invaluable input and suggestions on how to improve the site and documentation.
- Thank you to the Code Institute Slack community. Any questions I had were already answered in the channels so that was invaluable.