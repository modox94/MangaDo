# 🚧 UNDER CONSTRUCTION

# [MangaDo](https://mangado.onrender.com/)

## [Project Video Presentation](https://youtu.be/5hNBXkrXIX0?t=573)

This is a service created to coordinate the work of a manga (comics) translation team. During the workflow, team members face a number of organizational issues — and our service is here to solve them.

## Problems We Solve:

1. **Problem of positioning the translation relative to the original.**  
   > Due to the nature of the material, positioning is the first challenge. Each manga page contains many small text fragments and sound effects that need translation. It's often inconvenient for translators to work in complex, bulky apps like Photoshop just to indicate the correspondence between the original and the translation. We solve this problem with virtual markers.

2. **Problem of positioning editorial edits and their discussions.**  
   > A similar issue arises for editors, made worse by the need for discussions around each edit. Typically, these conversations happen in messengers, and for projects longer than 3 pages, this becomes a nightmare. Our service solves this by giving each virtual marker its own dedicated chat.

3. **Tracking the document’s status without using Photoshop.**  
   > Another important task we solve is synchronizing the latest versions of working files among team members and mimicking Photoshop’s layer functionality online. All team files are stored in Yandex.Disk cloud storage. Our service connects to this storage and always operates with up-to-date files. When opening a file on the site, users see the full set of layers, just like in the original. Each layer’s visibility can be toggled individually. This functionality simplifies work for team members who, for various reasons (e.g. low system resources or an unsupported OS), can’t use Photoshop. Thus, any team member can view the current state of the project on any device and control the order and content of .psd file layers without launching heavy and demanding software.

## You can access the site in "read-only" mode to evaluate its functionality using real projects.  
Go to the [SIGN IN](https://mangado.onrender.com/signIn) page and click the "Demo" button.

#### Technologies used during development:

- Node.js  
- React  
- Redux  
- React Router  
- WebSocket  
- ImageMagick  
- Yandex.Disk  
- MongoDB  
- ExpressJS  
- PM2  
- nginx  
- JWT tokens  
- bcrypt  

#### To launch the project, you need to:

1. Install [Node.js](https://nodejs.org/en/download/) (version 14 or higher)  
2. Install [ImageMagick](https://imagemagick.org/script/download.php)  
3. Install [Yandex.Disk](https://disk.yandex.ru/download)  
4. Create an online database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

#### Launch Order:

1. Open the `server` directory in a terminal and run `npm install`  
2. Copy the `.env.example` file, rename it to `.env`, and fill in the missing (or replace existing) fields:
   > PORT= *port on which the server will run*  
   > YANDEX_ROOT= *full path to the target folder on Yandex.Disk*  
   > DB_NAME= *Atlas database name*  
   > DB_LOGIN= *login for the Atlas database*  
   > DB_PASS= *password for the Atlas database*  
   > jwtToken= *secret alphanumeric combination*  
   > jwtRefreshToken= *secret alphanumeric combination*  
   > tokenLife= *lifetime of the regular token*  
   > refreshTokenLife= *lifetime of the refresh token*  
   > INVITE_ADMIN= *invite code to register as admin*  
   > INVITE_WORKER= *invite code to register as a regular worker*  
   > INVITE_DON= *invite code to register as a sponsor (read-only)*  

3. Run `npm start` in the terminal  
4. Open a new terminal window, navigate to the `client` folder, and run `npm install`  
5. Copy the `.env.example` file, rename it to `.env`, and if needed, replace the existing fields:
   > REACT_APP_SERVER_PATH= *server address*  
   > REACT_APP_WEBSOCKET_PATH= *WebSocket server address*  

6. Run `npm start`

### Task Distribution:

| Alexander | Konstantin | Nikita |
| :---: | :---: | :---: |
| site design | user authentication | `.psd` file handling |
| draggable markers | site "file system" | file synchronization |
| chats for markers | breadcrumbs | saving markers to DB |
| layer overlay |  | WebSocket setup |

### Planned Features:

- [x] Clickable links in chat  
- [ ] Reconfigure layer saving in `.webp` format  
- [ ] Retrieve original layer names  
- [ ] Use Chokidar to monitor folder changes  
- [ ] Add a separate "completion" status for each marker  
- [ ] Add "copy to clipboard" button for messages  
- [ ] Add unread message notifications  
- [ ] Add marker highlighting  
- [ ] Unify the method of data transfer  
