@echo off
echo Starting XAMPP MySQL...
start "" /B "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini"
timeout /t 4 /nobreak >nul
echo MySQL started on port 3309.
