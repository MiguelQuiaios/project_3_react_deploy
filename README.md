# Project Name

<br>

# Compatible Network

<br>

## Description

This is an app that allows the user to find people with the same interests as him and form a group and discuss strategies to achieve their goals faster. The app also provides information about the interest of the group.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and joining groups.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating and joining groups.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page and edit my interests in case I´m not as passion about it as i once was or if I find a new interest.
-  **Add Groups:** As a logged in user I can access the  groups page so that I can create a new group.
-  **Edit Groups:** As a logged in user I can access the edit group page so that I can change something that my team thinks is not okay like the description.
-  **Add members:** As a user I can accept people that are interest in joining the group.
-  **View Groups:** As a user I want to see the groups and the members in it and chat with them.
-  **View Chat** As a user I can see the chat to talk with them.
-  **Add Goals:** As a logged in user I can access the group goals page so that I can create a new group goal.
-  **Edit Goals:** As a logged in user I can access the edit goal page so that I can edit a goal.



## Backlog

- Add a reward if a group achives a big goal.


<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/groups/add`                | CreateGrouptPage     | user only `<PrivateRoute>` | Create new group    form.                               |
| `/groups`                    | GroupsListPage        | user only `<PrivateRoute>` | Groups list.                                           |
| `/groups/:groupsId`          | GroupsDetailPage      | user only `<PrivateRoute>` | Groups details. shows member list acces to their profiles. |
| `/groups/members/:id`        | MembersDetailsPage    | user only `<PrivateRoute>` | Single Member details.                                    |
| `/goals/add`                 | CreateGoalsPage       | user only `<PrivateRoute>` | Create new goal    form.                               |
| `/goals`                     | GoalsListPage         | user only `<PrivateRoute>` | Goals    
list.                                         |
| `/goals/members/:id`         | MembersDetailsPage    | user only `<PrivateRoute>` | Single Member details.      
| `/goals/:goalsId`            | GoalsDetailPage       | user only `<PrivateRoute>` | Goalsdetails.    Shows goals list and the members assigned to it. |



## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- CreateGroupsPage

- GroupsListPage

- GroupsDetailsPage

- CreateGoalsPage

- GoalsListPage

- GoalsetailsPage
  

Components:

- GroupsCard
- GoalsCard
- Navbar






## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Groups Service**

  - `groupsService` :
    - `.addGroups(groupsData)`
    - `.getGroups()`
    - `.getOneGroups(id)`
    - `.deleteGroups(id)`

- **Goal Service**

 - `goalsService` :
    - `.addGoals(goalsData)`
    - `.getGoals()`
    - `.getOneGoals(id)`
    - `.deleteGoals(id)`

<br>


# Server / Backend


## Models

**User model**

```javascript
{
 name: { type: String, required: true },
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 interests :[String]
 createdGroups: [ { type: Schema.Types.ObjectId, ref:'Groups' } ]
}
```



**Groups model**

```javascript
 {
   title: { type: String, required: true },
   description: { type: String, required: true },
   img: { type: String },
   members: [ { type: Schema.Types.ObjectId, ref:'User' } ],
   interests :[String]
   goals: [String],
 }
```


**Goals model**

```javascript
 {
   title: { type: String, required: true },
   description: { type: String, required: true },
   img: { type: String },
   members: [ { type: Schema.Types.ObjectId, ref:'User' } ],
   group: [{ type: Schema.Types.ObjectId, ref:'Groups' }]
 }
```






<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/api/groups`          |                              |                | 400          | Show all groups                                        |
| GET         | `/api/groups/:id`      |                              |                |              | Show specific groups                                     |
| POST        | `/api/groups`          | { title, description, img, members, goals }| 201            | 400          | Create and save a new groups                             |
| PUT         | `/api/groups/:id`      | { title, description, img, members, goals }| 200            | 400          | edit groups                                              |
| DELETE      | `/api/groups/:id`      |                              | 201            | 400          | delete groups                                            |

 GET         | `/api/goals`            |                              |                | 400          | Show all goals                                         |
| GET         | `/api/goals/:id`      |                              |                |              | Show specific goals                                     |
| POST        | `/api/goals`      c    | { title, description, img, members, groups } 201            | 400          | Create and save a new goals                             |
| PUT         | `/api/goals/:id`      | { title, description, img, members, goals }| 200            | 400          | edit goals                                              |
| DELETE      | `/api/goals/:id`      |                              | 201            | 400          | delete golas                                           |

| GET         | `/api/user/:id`     |                              |                |              | show specific user                                        |
| POST        | `/api/user`          | { name, interest, img, groupsId }  | 200            | 404          | add user                                                  |
| PUT         | `/api/user/:id`     | { name, interest, img, groupsId }         | 201            | 400          | edit user                                                  |
| DELETE      | `/api/user/:id`     |                              | 200            | 400          | delete user                                                |
                                                |


<br>

## API's

<br>

## Packages

<br>


## Links

### Trello/Kanban


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/MiguelQuiaios/Project_3_React)

[Server repository Link](https://github.com/MiguelQuiaios/Project_3_Backend)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your *public* presentation slides

### Contributors

FirstName LastName - <github-username> - <linkedin-profile-link>

