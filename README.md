# HEY

## To start with
Simply follow the instructions to have a working copy on your system.

### First things first
Type
`git clone https://nonamesake@bitbucket.org/nonamesake/idea-proj-dev.git`
in your bash terminal.

### Then
Change current directory to the main directory of the project `cd idea-proj-dev`

### Installing dependencies
Install all the required dependencies into each of the project's directories.
Just type in `npm i` in the main as well as the sub directories.

### Lastly
Change the current directory to the main directory and type in `npm start`

## Next steps

### A few more things to keep in mind
1. Any work regarding any feature will be done on a dedicated branch.
No commits should be made to the master branch.

2. Always check if your current branch is up to date with origin/master before staring any work.
This will avoid any merge conflicts.

3. Use `git fetch && git checkout <branch-name>` to checkout any branch.

4. Use `git status` to check the status of your current branch.

5. Use `git pull` to update the current branch with origin/master.

### When making a commit
1. Use `git add .` to stage all the changed files.

2. Use `git commit -m "Message" to commit the changes.

3. Use `git push` to push the changes.

4. Create a Pull Request containing all the changes.

### No commits to be made if the changes are breaking the UI.
