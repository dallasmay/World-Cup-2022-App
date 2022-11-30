# FIFA World Cup 2022 Bracket Bash
**Creators:** 

Dallas May - Dev, UX

Dylan May - UI/UX
<hr/>

The Bracket Bash is an app developed to run a bracket competition for the 2022 FIFA World Cup. It is fully deployed and is currently in use by around 30 people.

The Bracket Bash allows users to create and edit their own personal bracket with their predictions for the results of the tournament. There is a dedicated scoring system and leaderboard to allow users to see their rank and how well they place compared to everyone else. Participants can also seamlessly view other users' brackets from within the leaderboard. 

## Bracket Creation
Users can create an account which assigns them an empty bracket to be filled out. All changes to the bracket are saved in the database, and updated as necessary. Bracket creation is split into two parts: Group Stage and Knockout Stage, corresponding to the format of the tournament.

**Group Stage**

In the Group Stage, participants can view 8 groups which contain 4 teams each. Clicking a group brings up the selection page, where users can drag and drop each country to predict their final positions at the end of the Group Stage.

![Screenshot of group stage page. Features Group A with Netherlands, Senegal, Ecuador, and Qatar, and Group B with England, United States, Wales, and Iran](/WorldCupAppScreenshots/GroupStagePage.jpg?raw=true "Group Stage Page")
![Screenshot of group selection page. Features four countries in 1st, second, third, and fourth place with their names and flags](/WorldCupAppScreenshots/Group-Selection-Page.jpg?raw=true "Group Selection Page")

**Knockout Stage**

In the Knockout Stage, participants can view the head-to-head matchups, which are determined by their choices in the Group Stage. Clicking on a match brings up the selection page, where users can tap either country card to select them as the winner.

![Screenshot of Round of 16 page. Features head to head match ups for this round of the knockout stage](/WorldCupAppScreenshots/Ro16Page.jpg?raw=true "Round of 16 Page")
![Screenshot of head to head selection page. Shows two cards of countries with flags and names, with the Netherlands highlighted in gold with a crown above it.](/WorldCupAppScreenshots/H2H-Selection-Page.jpg?raw=true "Head to Head Selection Page")

Users can navigate between each round of the tournament via the navigation bar at the top of the screen. Users can also easily make all of their choices via the navigation at the bottom of the selection pages. Rounds are locked until all predictions in the preceeding round have been made.

Due to the nature of a bracket, predictions build on each other, with the options in every round relying on previous predictions. As a result, if changes are made to any earlier round, all "down-the-line" predictions affected by that change must be reset and the user must re-make those predictions with the new match-ups.

This is all handled dynamically by the app; it only resets predictions directly affected by the changes, which maximizes user experience by only requiring them to re-make the minimum amount of choices. It also re-locks the rounds accordingly, so it is clear where you need to be making decisions.

## Bracket Locking
During the selection phase of the competition, there was a countdown timer informing users how long they had to make their selections. After the tournament started, brackets were locked and users could no longer make any changes. The selection pages and routes were removed and the app transformed into a read-only state.

## Leaderboard
The app features a leaderboard, which shows all users' team names and their current points. An admin GUI was created to update the live results from the tournament. Calculation of points was also enacted from this GUI with a button click. A backend route was hit, which retrieved all user brackets and compared each one with the live results, awarding points to every player based on the scoring system created. All users' scores get updated in the database simultaneously. 

![Screenshot of leaderboard page, with various people with their names and team-names displayed, along with how many points they have.](/WorldCupAppScreenshots/LeaderBoardPage.jpg?raw=true "Head to Head Selection Page")

## Viewing Other Participants' Brackets
The leaderboard also contains the functionality to view other users' brackets. Clicking on a name on the leaderboard brings up a read-only view of that user's bracket, allowing comparisons to be made between all of the different participants.

![Screenshot of read-only page of John's bracket.](/WorldCupAppScreenshots/ViewOtherBracketPage.jpg?raw=true "Head to Head Selection Page")

## Other UI Screens
![Screenshot of home page, containing links to your bracket, the leaderboard, and the scoring system.](/WorldCupAppScreenshots/HomePage.jpg?raw=true "Home Page")
![Screenshot of scoring system page](/WorldCupAppScreenshots/ScoringPage.jpg?raw=true "Scoring System Page")
![Screenshot of scoring system page part 2](/WorldCupAppScreenshots/ScoringPage2.jpg?raw=true "Scoring System Page 2")
