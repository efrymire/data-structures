# Weekly Assignment 8 Details
#### Due October 23rd at 4PM

The details I used to complete this assignment are below. 

#### Articulation of the Data Model

My relational SQL model will include three columns: irsensor, tempsensor, and sensortime. 
<br><br>
The irsensor column will be an integer data type. The sensor value returns 0 and 1, 
which are the smallest and cheapest values to store to represent a "yes" or "no".
The integer data type offers the best balanace between range, storage size, and performance. 

The tempsensor column will be a double precision integer value because the sensor has a very
precise reading, down to several variables. The double integer data type allows precision and 
the decimal point can float anywhere within the digits. 

The final column, sensortime, will be leveraged for the time of day in which the 
values are read (or, at least, within a few seconds). The data type for this is timestamp, 
which corresponds to an internal clock every time the row is added to the database.

(https://github.com/efrymire/data-structures/blob/master/week_08/picture.jpg)


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