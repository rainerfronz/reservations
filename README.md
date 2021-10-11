# Restaurant Reservation Capstone
[heroku] 

Endpoints
/dashboard?date (shows reservations)<br>
/reservations (redirected to dashboard)<br>
GET /reservations?dates (redirected to dashboard)<br>
POST /reservations/new (create new reservations)<br>
POST /tables/new (assign table)<br>
POST /reservations/:reservation_id/seat (check available tables)<br>
PUT /tables/:table_id/seat (match reservation_id to table_id)<br>
PUT /reservations/:reservation_id/status (set status of table)<br>
/search GET /reservations?mobile (find reservations by mobile)<br>
PUT /reservations/:reservation_id/edit (edit reservation)<br>

Dashboard the home page




![dashboard](https://user-images.githubusercontent.com/65880191/136726202-2a1d4e49-0eaa-41a8-a8be-f8b9412db1dc.jpg)
Dashboard with Reservation
![thedashandres](https://user-images.githubusercontent.com/65880191/136726804-eb57037e-8f61-41f3-9a27-836208e1d1e5.jpg)
New Reservation Create
![newReservation](https://user-images.githubusercontent.com/65880191/136726199-b209f045-5576-4440-865f-4d5db8da0923.jpg)
Reservation Search
![resnotfound](https://user-images.githubusercontent.com/65880191/136726200-0cea3d7c-05cb-4c60-ad6b-518506e44ca2.jpg)
Finish Seat Message
![withreservation](https://user-images.githubusercontent.com/65880191/136726761-1b48029e-01f8-4288-8e8f-f2f76521f9b8.jpg)




Summary
A tool for restaurant managers to create and edit reservations. Keep a record of all reservations made along with the date, time, name, mobile #, and any other information you may like to add. Easily manage tables by checking on their status whether they are occupied, free or finished. Reservations can be found quickly by using a customers mobile number. While creating reservations, validations are put into place so a customer can only make reservations based on the criteria.

Technology
HTML, CSS, Javascript, React
Node.js and Express
installation
run npm install in root folder
run npm install in front-end and back-end subfolders
run heroku open -a s-r-r-client
Alt text
