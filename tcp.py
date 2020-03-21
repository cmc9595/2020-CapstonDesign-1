import requests
import random
import time

for i in range(10):
    value = random.randint(1, 200)
    r = requests.get("http://api.thingspeak.com/update?api_key=N6B4H6UYY6S1BJVT&field1=" + str(value))
    r.encoding='utf8'
    print(r.text)
    time.sleep(20)

    
