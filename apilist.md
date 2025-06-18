# Devtinder APIs

POST /signup
POST /login
POST /logout

GET /profile/view
PATCH /profile/edit
PATCH /profile/password

POST /request/send/interested/:userid
POST /request/send/ingnored/:userid

POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

GET /connections
GET /requests/received
GET /feed 

status:ignore,interested,accepted,rejected