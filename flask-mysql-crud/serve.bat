call set FLASK_APP=application.py 
call set FLASK_DEBUG=1 
call set DATABASE_URL=mysql://root:1111@localhost:3306/test
call flask run

