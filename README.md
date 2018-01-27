actonme
=======

    an action item manager written in react, golang for api with a postgres database

SERVER ENDPOINTS
----------------

### /ACTIONITEMS/

* GET /api/actionitems/       

returns json of all action items. accepts optional query "orderby" to order by certain value. default due date
e.g GET /api/actionitems/?orderby=actor

* GET /api/actionitems/{id}   

returns specific action item by id
e.g GET /api/actionitems/2

* POST /api/actionitems/      

create action item with form params. must set params for actor, due, creator, action
layout for due time string is "{YYYY}-{MM}-{DD}T{HH}:{SS}"

### /COMPLETE/

* GET /api/complete/

returns json of all completed action items. accepts optional query "orderby" in the same format as actionitems endpoint
e.g GET /api/complete/?orderby=due

* POST /api/complete/{id}

updates specific action item to set completed to true
e.g POST /api/complete/1

### /INCOMPLETE/

* GET /api/incomplete/

returns json of all incomplete action items. accepts optional query "orderby" in the same format as actionitems endpoint
e.g GET /api/incomplete/?orderby=due

* POST /api/incomplete/{id}

updates specific action item to set completed to false
e.g POST /api/incomplete/2

### /DELETE/

* POST /api/delete/{id}

deletes a certain action item from database
e.g POST /api/delete/2
