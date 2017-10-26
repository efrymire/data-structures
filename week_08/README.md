# Weekly Assignment 8 Details
#### Due October 23rd at 4PM

The details I used to complete this assignment are below. 

#### Articulation of the Data Model

My relational SQL model will include three columns: irsensor, tempsensor, and sensortime. 
<br><br>
The irsensor column will be an integer data type. The sensor value returns 0 and 1, 
which are the smallest and cheapest values to store to represent a "yes" or "no".
The integer data type offers the best balanace between range, storage size, and performance. One of my
potential situations for these photon sensors includes aggregating the amount of infrared "hits" in 
a specific time period, so intger seems to be the best option.

The tempsensor column will be a double precision integer value because the sensor has a very
precise reading, down to several variables. The double integer data type allows precision and 
the decimal point can float anywhere within the digits. 

The final column, sensortime, will be leveraged for the time of day in which the 
values are read (or, at least, within a few seconds). The data type for this is timestamp, 
which corresponds to an internal clock every time the row is added to the database.

[Data Table Model](images/datamodel.jpg)

#### Shower Vacancy Project

The data would be two measurements that answer a question: "Is the shower available?"
Ideally, I'd like to create a "switch" with the infrared sensor on the bathroom door, 
and measure the temperature in the bathroom to determine if someone is already showering.

IR Option 1: We have a hook on the back of the bathroom door that holds our towels when we shower. 
I'll place an infrared light below that hook, so when the towel is placed on the hook, the sensor doesn't 
pick up the light and the result is "0". When there is no towel, the result is "1".  

IR Option 2: If the towel doesn't fully block out the infrared light, then I could place a mirror below the 
hook and have an infrared light _behind_ the sensor. When the hook is free, the mirror will pick up the 
infrared light and reflect it back to the sensor (result of "1"). When a towel is on the hook, the mirror doesn't
reflect the light back to the sensor (result of "0").

Our bathroom has very little ventilation. When the shower is in use, the room gets much warmer, 
and the recorded temperature should increase.

[Shower Vacancy visualization](images/Shower_vacancy.jpg)

#### "Netflix and Chill" Project

Another project option would be to measure how much infrared activity takes place in the living room
along with the temperature of the living room. 

I've placed the photon particle next to the tv, and it actively measures remote activity 
along with the often frigid temperatures in our living room. This project has been tested and works well. 

[Netflix and Chill visualization](images/Netflix_and_chill.jpg)

#### PSQL Code

Create Table with PSQL

```js
CREATE TABLE sensorData (
irsensor int,
tempsensor double precision,
sensortime timestamp DEFAULT current_timestamp);
```

Add data

```js
INSERT INTO sensorData VALUES (0, 18, DEFAULT);
INSERT INTO sensorData VALUES (1, 19, DEFAULT);
INSERT INTO sensorData VALUES (0, 19, DEFAULT);
INSERT INTO sensorData VALUES (0, 18, DEFAULT);
```

Resulting Table

```js
SELECT * FROM sensorData;

 irsensor | tempsensor |         sensortime         
----------+------------+----------------------------
        0 |         18 | 2017-10-18 01:00:59.053064
        1 |         19 | 2017-10-18 01:08:02.44365
        0 |         19 | 2017-10-18 01:08:08.065326
        0 |         18 | 2017-10-23 15:16:26.023186
(4 rows)
```