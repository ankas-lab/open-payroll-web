Run dockerfile

docker build -t open-payroll-web:0.1.0 .
docker run -p 3000:3000 open-payroll-web:0.1.0

