**Gmail To Tasks**

You can automate creating a todo Task in Gmail for labelled messages by following the below Steps:

1) Label your messages, I use CustomersToDo
2) Create new Google Sheet
3) Go To Extensions > App Script
4) Copy the code below after making the following changes:
  a) Change the Label name to your label name
  b) Execute getTaskListIDs to get You TaskListID (target list to create the to do item)
