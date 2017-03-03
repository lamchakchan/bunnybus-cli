
#!/usr/bin/env bash

#check for port on rabbit box
while ! nc -z 127.0.0.1 5672; do
	echo WAITING FOR 127.0.0.1:5672
done

echo CONNECTION DETECTED, WAITING FOR 4 SEC TO FINISH RMQ BOOTUP
sleep 4
